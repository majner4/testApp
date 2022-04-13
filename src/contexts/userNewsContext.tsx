import React, { useContext, createContext, useState } from "react";
import { IUserNews } from "../types";

export const UserNewsContext = createContext<{
  userNews: {
    news?: IUserNews[];
    setNews: (news: IUserNews[]) => void;
  };
}>({
  userNews: {
    setNews: () => {},
  },
});

export const UserNewsProvider: React.FC<React.PropsWithChildren<{}>> = (
  props
) => {
  const [news, setNews] = useState<IUserNews[]>([]);

  return (
    <UserNewsContext.Provider
      value={{
        userNews: { news, setNews },
      }}
    >
      {props.children}
    </UserNewsContext.Provider>
  );
};

export const useUserNews = () => {
  const ctx = useContext(UserNewsContext);

  return {
    context: ctx,
  };
};
