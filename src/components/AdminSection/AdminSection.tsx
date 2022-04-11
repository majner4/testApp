import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import { getAll } from "../../services/userAPI";
import { AdminTable } from "./AdminTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const AdminSection = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Typography variant="h4" align="center" color="textPrimary">
        Admin sekce
      </Typography>
      <AdminTable
        data={allUsers}
        changeData={(change: boolean) => setUpdateData(change)}
      />
    </div>
  );
};

export default AdminSection;
