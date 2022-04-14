import { createContext } from "react";
import { IUserData } from "../types";

export const UserDataContext = createContext<{
  userData: { data?: IUserData; setUserData: (data: IUserData) => void };
}>({
  userData: {
    setUserData: () => {},
  },
});
