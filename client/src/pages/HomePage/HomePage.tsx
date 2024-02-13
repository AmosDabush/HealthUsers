import { Typography, Container, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
// import { ReactComponent as Illustration } from "../../assets/illustration.eps";

const HomePage = ({
  userName,
  logout,
}: {
  userName: string;
  logout: () => void;
}) => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          height: "70vh",
          marginTop: "3rem",
        }}
      >
        <Box sx={{ marginRight: "2rem" }}>
          <Typography variant="h2" align="center" color="primary" gutterBottom>
            Welcome {userName ? userName : ""}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Discover the possibilities
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/users"
            >
              Users Page
            </Button>
            <Button variant="outlined" color="primary" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "50%", height: "auto" }}></Box>
      </Box>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        paragraph
      >
        This is a simple login app with basic authentication created by Amos
        Dabush 2024 .
      </Typography>
    </Container>
  );
};

export default HomePage;
