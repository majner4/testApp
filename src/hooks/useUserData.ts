import { useContext } from "react";
import { UserDataContext } from "../contexts";

export const useUserData = () => {
  const ctx = useContext(UserDataContext);

  const loginUser = () => {
    setTimeout(() => {
      ctx.userData.setUserData({ _id: "TEST_USER_LOGGED" });
    }, 1500);
  };

  return {
    loginUser,
    context: ctx,
  };
};
