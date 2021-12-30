import Box from "@mui/material/Box";

export default function Navbar({ children }) {
  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: "1rem",
        alignItems: "center",
        borderBottom: "1px lightgrey dashed",
      }}
      display="flex"
      flexDirection="row"
    >
      {children}
    </Box>
  );
}
