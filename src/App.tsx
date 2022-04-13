import { SnackbarProvider } from "notistack";
import { UserDataProvider } from "./contexts/userContext";
import { Router } from "./components";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <UserDataProvider>
        <Router />
      </UserDataProvider>
    </SnackbarProvider>
  );
};

export default App;
