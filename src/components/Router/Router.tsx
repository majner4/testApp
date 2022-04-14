import { VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserData } from "../../hooks";
import {
  AdminSection,
  ChangePassword,
  News,
  Profile,
  RegisterPage,
  Settings,
  SignInPage,
  UserInfo,
} from "../../pages";

export const Router: VFC = () => {
  const {
    context: { userData },
  } = useUserData();
  const { data } = userData;

  const admin = data?.role === "admin";
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<Profile />}>
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/profile/changePassword" element={<ChangePassword />} />
        <Route path="/profile/news" element={<News />} />
        <Route path="/profile/info" element={<UserInfo />} />
        {admin && <Route path="/profile/admin" element={<AdminSection />} />}
      </Route>
    </Routes>
  );
};
