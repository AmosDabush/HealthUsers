import React from "react";
import useAuthProtected from "../../hooks/useAuthProtected";
import { Container } from "@mui/material";

import UsersTable from "../../partials/UsersTable/UsersTable";

const UsersPage: React.FC = () => {
  useAuthProtected();
  return (
    <Container component="main" maxWidth="md">
      <div className="dashboardContainer">
        <UsersTable />
      </div>
    </Container>
  );
};

export default UsersPage;
