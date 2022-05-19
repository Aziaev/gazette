import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDrag } from "react-dnd";
import { TASK_STATUSES } from "../constants";

const STATUS_COLOR_MAP = {
  [TASK_STATUSES.new]: "primary",
  [TASK_STATUSES.inProgress]: "warning",
  [TASK_STATUSES.done]: "success",
};

export default function TaskCard(props) {
  const { task, handleDeleteTask, handleEditTask } = props;
  const { id, title, description, status, assignee, creator } = task;

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
        <Chip size="small" color={STATUS_COLOR_MAP[status]} label={status} />
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" component="div">
          Создатель: {creator.name}
        </Typography>
        <Typography variant="body2" component="div">
          Ответственный: {assignee.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button id={id} onClick={handleDeleteTask} startIcon={<DeleteIcon />} />
        <Button id={id} onClick={handleEditTask} startIcon={<EditIcon />} />
      </CardActions>
    </Card>
  );
}
