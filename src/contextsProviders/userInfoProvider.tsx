import { useState } from "react";
import { UserInfoContext } from "../contexts";
import { IUserInfoFormValues } from "../types";

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
