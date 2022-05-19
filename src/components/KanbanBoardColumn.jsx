import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDrop } from "react-dnd";
import { useTasksContext } from "../context/TasksContext";

export default function KanbanBoardColumn({ children, title, status }) {
  const { updateTask } = useTasksContext();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "card",
      drop(task, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }

        updateTask({ ...task, status });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    []
  );

  return (
    <Box
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: isOver ? "cornsilk" : undefined,
      }}
      ref={drop}
    >
      <Typography
        gutterBottom
        component="div"
        sx={{ textAlign: "center", backgroundColor: "white" }}
        variant="h5"
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
