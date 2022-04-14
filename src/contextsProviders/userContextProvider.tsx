import { useState } from "react";
import { UserDataContext } from "../contexts";
import { IUserData } from "../types";

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
