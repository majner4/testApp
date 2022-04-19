import { Avatar, Button, styled } from "@mui/material";
import { Form } from "formik";

const RootContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const FormWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "550px",
  maxWidth: "100%",
  borderRadius: "20px",
  padding: theme.spacing(4, 2),
  background:
    "linear-gradient(153deg, rgba(255,255,255,1) 0%, rgba(0,204,255,0.7455357142857143) 100%)",
  boxShadow: "1px 1px 10px 0px rgb(169 169 169 / 69%)",
}));

const StyledSignForm = styled(Form)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "360px",
  width: "100%",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: "20px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "100px",
  width: "100px",
  background: theme.palette.primary.main,
}));

const StyledForm = styled(Form)(({ theme }) => ({
  maxWidth: "500px",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: "20px",
  boxShadow: "1px 1px 10px 0px rgba(220,220,220,0.4)",
}));

const SubmitButon = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export {
  StyledForm,
  SubmitButon,
  RootContainer,
  FormWrapper,
  StyledSignForm,
  StyledAvatar,
};
