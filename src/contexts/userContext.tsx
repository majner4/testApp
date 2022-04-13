import React, { useContext, createContext, useState } from "react";
import { IUserData } from "../types";

export const UserDataContext = createContext<{
  userData: { data?: IUserData; setUserData: (data: IUserData) => void };
}>({
  userData: {
    setUserData: () => {},
  },
});

export const UserDataProvider: React.FC<React.PropsWithChildren<{}>> = (
  props
) => {
  const [data, setUserData] = useState<IUserData>({});

  return (
    <UserDataContext.Provider
      value={{
        userData: { data, setUserData },
      }}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};

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
