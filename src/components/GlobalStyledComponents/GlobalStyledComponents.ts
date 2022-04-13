import { Button, styled } from "@mui/material";
import { Form } from "formik";

const RootContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled(Form)(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  maxWidth: "500px",
  marginTop: theme.spacing(1),
  padding: theme.spacing(3),
  borderRadius: "10px",
  boxShadow: "1px 1px 10px 0px rgba(192,192,192,0.69)",
}));

const SubmitButon = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: "#ffc000",
  color: "#000",
  "&:hover, &:focus": {
    backgroundColor: "#ebb100",
  },
}));

export { StyledForm, SubmitButon, RootContainer };
