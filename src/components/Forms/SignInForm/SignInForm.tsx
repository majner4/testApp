import { Typography, LinearProgress, TextField } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { ILoginFormValues } from "../../../types";
import { loginUser, IFUser } from "../../../services";
import {
  StyledAvatar,
  StyledFormControl,
  StyledSignForm,
  SubmitButon,
} from "../../GlobalStyledComponents";
import { VFC } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { getValidationMessage } from "../../../utils";
import { emailRegExp } from "../../../constants";

const formIntialValues = {
  email: "",
  password: "",
};

export const SignInForm: VFC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<ILoginFormValues>({
    reValidateMode: "onChange",
    mode: "all",
  });
  const { formState } = methods;
  const { isValid, isSubmitting } = formState;

  const handleLogin: SubmitHandler<IFUser> = async (data) => {
    let login = await loginUser.login(data);
    const notification = login.statusMessage;

    const token = login.data?.token;
    if (token && !login.error) {
      Cookies.set("token", token);
      navigate("/profile/news");
    } else {
      enqueueSnackbar(notification.message, { variant: notification.type });
    }
  };

  return (
    <FormProvider {...methods}>
      <StyledSignForm noValidate onSubmit={methods.handleSubmit(handleLogin)}>
        <StyledAvatar>
          <AccountBox sx={{ fontSize: "5rem", color: "#fff" }} />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Přihlášení
        </Typography>
        <Controller
          name="email"
          rules={{
            required: true,
            pattern: emailRegExp,
          }}
          defaultValue={formIntialValues.email}
          render={({ field, fieldState }) => (
            <StyledFormControl fullWidth>
              <TextField
                fullWidth
                label="Zadejte email"
                variant="outlined"
                error={!!fieldState.error}
                helperText={
                  fieldState.error && (
                    <div>
                      {getValidationMessage(fieldState.error, "emailu")}
                    </div>
                  )
                }
                required={true}
                defaultValue={field.value as string}
                autoComplete="off"
                {...field}
              />
            </StyledFormControl>
          )}
        />
        <Controller
          name="password"
          rules={{
            required: true,
            minLength: 8,
          }}
          defaultValue={formIntialValues.password}
          render={({ field, fieldState }) => (
            <StyledFormControl fullWidth>
              <TextField
                fullWidth
                label="Zadejte heslo"
                type="password"
                variant="outlined"
                error={!!fieldState.error}
                helperText={
                  fieldState.error && (
                    <div>
                      {getValidationMessage(fieldState.error, "hesla", 8)}
                    </div>
                  )
                }
                required={true}
                defaultValue={field.value as string}
                autoComplete="off"
                {...field}
              />
            </StyledFormControl>
          )}
        />
        {isSubmitting && <LinearProgress />}
        <SubmitButon
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Přihlásit se
        </SubmitButon>
        {/* <Button color='primary' variant='contained'>
									<Facebook />
								</Button> */}
        <Typography variant="body1" textAlign="right">
          <Link to="/register">Nemáte účet? Registrace</Link>
        </Typography>
      </StyledSignForm>
    </FormProvider>
  );
};
