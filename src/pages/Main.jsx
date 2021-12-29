import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRouteActive = pathname === Main.route;

  return (
    <>
      <Box
        sx={{ bgcolor: "white", padding: "1rem" }}
        display="flex"
        flexDirection="row"
      >
        <Link
          sx={{
            cursor: "pointer",
            color: "black",
            textDecoration: isRouteActive ? "none" : "underline",
          }}
          onClick={isRouteActive ? undefined : () => navigate(Main.route)}
        >
          <Typography variant="h3" gutterBottom component="div">
            Издательство
          </Typography>
        </Link>
      </Box>
      <Box sx={{ bgcolor: "white", padding: "1rem", flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Box sx={{ bgcolor: "white", padding: "1rem" }}>
        <Typography variant="caption" display="block" gutterBottom>
          Редакция
        </Typography>
      </Box>
    </>
  );
}

Main.route = "/";
