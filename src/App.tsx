import { Routes, Route } from "react-router-dom";
import { SignInPage, ProfilePage, RegisterPage } from "./pages";
import { SnackbarProvider } from "notistack";
import { UserDataProvider } from "./contexts/userContext";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserDataProvider>
    </SnackbarProvider>
  );
};

export default App;
