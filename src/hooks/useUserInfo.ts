import { useContext } from "react";
import { UserInfoContext } from "../contexts";

export const useUserInfo = () => {
  const ctx = useContext(UserInfoContext);

  return {
    context: ctx,
  };
};
