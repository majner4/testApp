import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  Button,
} from "@material-ui/core";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { updateUser } from "../../services/userAPI";

interface IFUserTableData {
  _id: string;
  email: string;
  createdDate: Date;
  blocked: boolean;
  password: string;
}

interface IFAdminTableProps {
  data: IFUserTableData[];
  changeData: (change: boolean) => void;
}

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#ffc000",
  },
  table: {
    minWidth: 500,
  },
});

export const AdminTable = (props: IFAdminTableProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const data = props.data;
  const changeData = props.changeData;
  const token = Cookies.get("token");

  const handleChangeBlocked = async (data: IFUserTableData) => {
    const currentData = {
      ...data,
      blocked: !data.blocked,
    };
    if (token) {
      const updateUserData = await updateUser.update(currentData, token);
      const notification = updateUserData.statusMessage;
      changeData(true);
      enqueueSnackbar(notification.message, { variant: notification.type });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead classes={{ root: classes.tableHeader }}>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Datum registrace</TableCell>
            <TableCell align="left">Blokace</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IFUserTableData) => (
            <TableRow key={row._id}>
              <TableCell
                align="left"
                component="th"
                scope="row"
                style={{ width: 100 }}
              >
                {row._id}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                {row.email}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                {moment(row.createdDate.toString()).format("DD/MM/YYYY HH:mm")}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={row.blocked}
                      name="checkedB"
                      color="primary"
                      disabled={true}
                    />
                  }
                  label=""
                />
              </TableCell>
              <TableCell
                align="left"
                component="th"
                scope="row"
                style={{ width: 100 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleChangeBlocked(row)}
                >
                  {row.blocked ? "Odblokovat" : "Zablokovat"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
