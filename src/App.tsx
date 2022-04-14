import { SnackbarProvider } from "notistack";
import { VFC } from "react";
import { Router } from "./components";
import {
  UserDataProvider,
  UserInfoProvider,
  UserNewsProvider,
} from "./contextsProviders";

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
