import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function NavItem(props) {
  const navigate = useNavigate();
  const { isRouteActive, path, text, variant = "h5" } = props;

  return (
    <Link
      sx={{
        cursor: isRouteActive ? "default" : "pointer",
        color: "black",
        textDecoration: isRouteActive ? "none" : "underline",
      }}
      onClick={isRouteActive ? undefined : () => navigate(path)}
    >
      <Typography variant={variant} gutterBottom component="div">
        {text}
      </Typography>
    </Link>
  );
}
