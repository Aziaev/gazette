import Box from "@mui/material/Box";
import * as React from "react";

export default function KanbanBoardColumns({ children }) {
  return (
    <Box
      xs={12}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 3,
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
