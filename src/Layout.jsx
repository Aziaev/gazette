import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./AppRoutes";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }} display="flex" flexDirection="column">
          <AppRoutes />
        </Box>
      </Container>
    </>
  );
}
