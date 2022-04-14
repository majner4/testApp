import { createContext } from "react";
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
