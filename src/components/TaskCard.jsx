import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CardHeader, Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { TASK_STATUSES } from "../constants";

const STATUS_COLOR_MAP = {
  [TASK_STATUSES.new]: "primary",
  [TASK_STATUSES.inProgress]: "warning",
  [TASK_STATUSES.done]: "success",
};

export default function TaskCard(props) {
  const { task, index, handleDeleteTask, handleEditTask, moveCard } = props;
  const { id, title, description, status, assignee, creator } = task;

  const ref = useRef(null);

  // const [{ handlerId }, drop] = useDrop({
  //   accept: "card",
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;
  //
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }
  //
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //
  //     const hoverMiddleY =
  //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //       return;
  //     }
  //     moveCard(dragIndex, hoverIndex);
  //
  //     item.index = hoverIndex;
  //   },
  // });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { task, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  // drag(drop(ref));

  return (
    <Card
      height="auto"
      sx={{ opacity }}
      ref={drag}
      // ref={ref}
      // data-handler-id={handlerId}
    >
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
