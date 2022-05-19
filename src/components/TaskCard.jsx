import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function TaskCard(props) {
  const { task, index, handleDeleteTask, handleEditTask, moveCard } = props;
  const { id, title, description, status } = task;

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
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {status}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button id={id} onClick={handleDeleteTask} startIcon={<DeleteIcon />} />
        <Button id={id} onClick={handleEditTask} startIcon={<EditIcon />} />
      </CardActions>
    </Card>
  );
}
