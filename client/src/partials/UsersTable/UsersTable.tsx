import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import useAuthProtected from "../../hooks/useAuthProtected";
import { useUsersData } from "../../hooks/useUsersData";

const UsersTable: React.FC = () => {
  useAuthProtected();
  const { users, orderDirection, valueToOrderBy, handleRequestSort } =
    useUsersData();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {(
              ["fullName", "email", "phone", "createdAt", "updatedAt"] as const
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
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
