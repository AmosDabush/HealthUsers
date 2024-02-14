import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IUser } from "../interfaces/user_interface";
import useAxios from "./useAxios";

type Order = "asc" | "desc";

export const useUsersData = () => {
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useAxios<IUser[], IUser[]>({
    url: "http://localhost:3000/api/users/",
    method: "get",
    config: {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    },
  });

  const [orderDirection, setOrderDirection] = useState<Order>("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState<keyof IUser>("fullName");

  useEffect(() => {
    refetch();
  }, []);

  const handleRequestSort = (property: keyof IUser) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const sortedUsers = (
    array: IUser[],
    comparator: (a: IUser, b: IUser) => number
  ) => {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [IUser, number]
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

  return {
    users: sortedUsers(
      users || [],
      getComparator(orderDirection, valueToOrderBy)
    ),
    orderDirection,
    valueToOrderBy,
    handleRequestSort,
    isLoading,
    error,
  };
};
