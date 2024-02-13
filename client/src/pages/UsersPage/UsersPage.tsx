import React, { useState, useEffect } from "react";
import useAuthProtected from "../../hooks/useAuthProtected";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Container,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "../../interfaces/user_interface";

type Order = "asc" | "desc";

const UsersPage: React.FC = () => {
  useAuthProtected();
  const [users, setUsers] = useState<IUser[]>([]);
  const [orderDirection, setOrderDirection] = useState<Order>("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState<keyof IUser>("fullName");

  // todo create context ?
  // todo move all helpers
  // todo use useAxios if needed

  const fetchUsers = async () => {
    const response = await axios.get<IUser[]>(
      "http://localhost:3000/api/users/",
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      },
    );
    console.log(response);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequestSort = (property: keyof IUser) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const sortedUsers = (
    array: IUser[],
    comparator: (a: IUser, b: IUser) => number,
  ) => {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [IUser, number],
    );
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order: Order, orderBy: keyof IUser) => {
    return order === "desc"
      ? (a: IUser, b: IUser) => descendingComparator(a, b, orderBy)
      : (a: IUser, b: IUser) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a: IUser, b: IUser, orderBy: keyof IUser) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <Container component="main" maxWidth="md">
      <div className="dashboardContainer">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {(
                  [
                    "fullName",
                    "email",
                    "phone",
                    "createdAt",
                    "updatedAt",
                  ] as const
                ).map((headCell) => (
                  <TableCell key={headCell}>
                    <TableSortLabel
                      active={valueToOrderBy === headCell}
                      direction={
                        valueToOrderBy === headCell ? orderDirection : "asc"
                      }
                      onClick={() => handleRequestSort(headCell)}
                    >
                      {headCell}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers(
                users,
                getComparator(orderDirection, valueToOrderBy),
              ).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default UsersPage;
