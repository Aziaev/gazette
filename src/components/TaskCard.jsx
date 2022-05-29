import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip, IconButton, ListItemIcon, Menu } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { TASK_STATUSES, TASK_TYPES } from "../constants";
import TaskProgressButton from "./TaskProgressButton";

const STATUS_COLOR_MAP = {
  [TASK_STATUSES.new]: "primary",
  [TASK_STATUSES.inProgress]: "warning",
  [TASK_STATUSES.done]: "success",
};

export default function TaskCard(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { task, handleDeleteTask, handleEditTask } = props;
  const { id, title, description, type, status, assignee, creator } = task;

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function deleteTask(e) {
    handleDeleteTask(e);
    closeMenu();
  }

  function editTask(e) {
    handleEditTask(e);
    closeMenu();
  }

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return task;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <Card height="auto" sx={{ opacity }} ref={drag}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip size="small" color={STATUS_COLOR_MAP[status]} label={status} />
          <IconButton onClick={openMenu}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
          {TASK_TYPES[type]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body1" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="caption" component="div">
          Создатель: {creator.name}
        </Typography>
        <Typography variant="caption" component="div">
          Ответственный: {assignee.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-start" }}>
        <TaskProgressButton task={task} />
      </CardActions>
      <Menu
        id="task-card-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem id={id} onClick={deleteTask}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Удалить
        </MenuItem>
        {status === TASK_STATUSES.new && (
          <MenuItem id={id} onClick={editTask}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Изменить
          </MenuItem>
        )}
      </Menu>
    </Card>
  );
}
