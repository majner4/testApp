import { SnackbarProvider } from "notistack";
import { VFC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Router } from "./components";
import {
  UserDataProvider,
  UserInfoProvider,
  UserNewsProvider,
} from "./contextsProviders";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007AFF",
      contrastText: "#fff",
      dark: "#0052FF",
    },
    error: {
      main: "#e34234",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <UserDataProvider>
          <UserInfoProvider>
            <UserNewsProvider>
              <Router />
            </UserNewsProvider>
          </UserInfoProvider>
        </UserDataProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
