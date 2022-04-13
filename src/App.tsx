import { SnackbarProvider } from "notistack";
import {
  UserDataProvider,
  UserInfoProvider,
  UserNewsProvider,
} from "./contexts";
import { Router } from "./components";
import { VFC } from "react";

const App: VFC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <UserDataProvider>
        <UserInfoProvider>
          <UserNewsProvider>
            <Router />
          </UserNewsProvider>
        </UserInfoProvider>
      </UserDataProvider>
    </SnackbarProvider>
  );
};

export default App;
