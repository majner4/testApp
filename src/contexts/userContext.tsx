import React, { useContext, createContext, useState } from "react";
import { ISchedule } from "tui-calendar";
import { IFUserData } from "../pages/ProfilePage";
import { IFUserInfoFormValues, IFUserNews } from "../types/FormTypes";

export const userDataContext = createContext<{
  userData: { data?: IFUserData; setUserData: (data: IFUserData) => void };
  userInfoData: {
    infoData?: IFUserInfoFormValues;
    setUserInfoData: (infoData: IFUserInfoFormValues) => void;
  };
  userEvents: {
    events?: ISchedule[];
    setEvents: (events: ISchedule[]) => void;
  };
  userNews: {
    news?: IFUserNews[];
    setNews: (news: IFUserNews[]) => void;
  };
}>({
  userData: {
    setUserData: () => {},
  },
  userInfoData: {
    setUserInfoData: () => {},
  },
  userEvents: {
    setEvents: () => {},
  },
  userNews: {
    setNews: () => {},
  },
});

const UserDataProvider: React.FC = ({ children }) => {
  const [data, setUserData] = useState<IFUserData>({});
  const [infoData, setUserInfoData] = useState<IFUserInfoFormValues>({});
  const [events, setEvents] = useState<ISchedule[]>([]);
  const [news, setNews] = useState<IFUserNews[]>([]);

  return (
    <userDataContext.Provider
      value={{
        userData: { data, setUserData },
        userInfoData: { infoData, setUserInfoData },
        userEvents: { events, setEvents },
        userNews: { news, setNews },
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export const useUserData = () => {
  const ctx = useContext(userDataContext);

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

export default UserDataProvider;
