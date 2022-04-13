import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import { getAll } from "../../../services";
import { AdminTable } from "./AdminTable";
import { RootContainer } from "../../../components";

export const AdminSection = () => {
  const [allUsers, setAllUsers] = useState<[]>([]);
  const [updateData, setUpdateData] = useState<boolean>(false);

  const token = Cookies.get("token");

  const getAllUsers = async () => {
    if (token) {
      const data = await getAll.get(token);
      if (data) {
        setAllUsers(data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getAllUsers();
    setUpdateData(false);
  }, [updateData]);

  return (
    <RootContainer>
      <Typography variant="h4" align="center" color="textPrimary">
        Admin sekce
      </Typography>
      <AdminTable
        data={allUsers}
        changeData={(change: boolean) => setUpdateData(change)}
      />
    </RootContainer>
  );
};