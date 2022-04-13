import React, { useContext, createContext, useState } from "react";
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

export const UserInfoProvider: React.FC<React.PropsWithChildren<{}>> = (
  props
) => {
  const [infoData, setUserInfoData] = useState<IUserInfoFormValues>({});

  return (
    <UserInfoContext.Provider
      value={{
        userInfoData: { infoData, setUserInfoData },
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const ctx = useContext(UserInfoContext);

  return {
    context: ctx,
  };
};
