import {
  FormControl,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { IRegisterFormValues } from "../../../types";
import { createUser, loginUser, IFUser } from "../../../services";
import { StyledAvatar, StyledSignForm, SubmitButon } from "../../../components";
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
  confirmPassword: "",
};

export const RegisterForm: VFC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const methods = useForm<IRegisterFormValues>({
    reValidateMode: "onChange",
    mode: "all",
  });

  const { formState } = methods;
  const { isValid, isSubmitting } = formState;

  const hanleRegister: SubmitHandler<IFUser> = async (data) => {
    const register = await createUser.create(data);
    const notification = register.statusMessage;
    if (register?.error) {
      enqueueSnackbar(notification.message, { variant: notification.type });
    }

    if (!register.error) {
      let login = await loginUser.login(data);
      const token = login.data.token;
      if (token && !login.error) {
        if (data) {
          Cookies.set("token", token);
          navigate("/profile/news");
        }
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <StyledSignForm noValidate onSubmit={methods.handleSubmit(hanleRegister)}>
        <StyledAvatar>
          <PersonAdd sx={{ fontSize: "4.5rem", color: "#fff" }} />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Registrace
        </Typography>
        <Controller
          name="email"
          rules={{
            required: true,
            pattern: emailRegExp,
          }}
          defaultValue={formIntialValues.email}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
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
            </FormControl>
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
            <FormControl fullWidth>
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
            </FormControl>
          )}
        />
        <Controller
          name="confirmPassword"
          rules={{
            required: true,
            minLength: 8,
          }}
          defaultValue={formIntialValues.confirmPassword}
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Heslo znovu"
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
            </FormControl>
          )}
        />
        {isSubmitting && <LinearProgress />}
        <br />
        <SubmitButon
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Registrovat se
        </SubmitButon>
        <Typography variant="body1" textAlign="right">
          <Link to="/login">Máte účet? Přihlášení.</Link>
        </Typography>
      </StyledSignForm>
    </FormProvider>
  );
};
