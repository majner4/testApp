import { createContext } from "react";
import { IUserInfoFormValues } from "../types";

export const UserInfoContext = createContext<{
  userInfoData: {
    infoData?: IUserInfoFormValues;
    setUserInfoData: (infoData: IUserInfoFormValues) => void;
  };
}>({
  userInfoData: {
    setUserInfoData: () => {},
  },
});
