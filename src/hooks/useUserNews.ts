import { useContext } from "react";
import { UserNewsContext } from "../contexts";

export const useUserNews = () => {
  const ctx = useContext(UserNewsContext);

  return {
    context: ctx,
  };
};
