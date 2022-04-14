import { useState } from "react";
import { UserNewsContext } from "../contexts";
import { IUserNews } from "../types";

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
