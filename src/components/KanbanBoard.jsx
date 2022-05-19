import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import * as React from "react";
import TaskCard from "../components/TaskCard";
import { TASK_STATUSES } from "../constants";
import KanbanBoardColumn from "./KanbanBoardColumn";
import KanbanBoardColumns from "./KanbanBoardColumns";

export default function KanbanBoard({
  tasks,
  handleDeleteTask,
  handleEditTask,
  handleOpen,
  setTasks,
}) {
  console.log(tasks);
  const newTasks = getNewTasks(tasks);
  const inProgressTasks = getInProgressTasks(tasks);
  const doneTasks = getDoneTasks(tasks);

  // const moveCard = useCallback(
  //   (dragIndex, hoverIndex) => {
  //     const newTasks = update(tasks, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, tasks[dragIndex]],
  //       ],
  //     });
  //
  //     setTasks(newTasks);
  //   },
  //   [tasks, setTasks]
  // );

  return (
    <KanbanBoardColumns>
      <KanbanBoardColumn title="Новые задачи" status={TASK_STATUSES.new}>
        {newTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            index={index}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            // moveCard={moveCard}
          />
        ))}
        <Button onClick={handleOpen} startIcon={<AddIcon />}>
          Добавить задачу
        </Button>
      </KanbanBoardColumn>
      <KanbanBoardColumn title="В работе" status={TASK_STATUSES.inProgress}>
        {inProgressTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            index={index}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            // moveCard={moveCard}
          />
        ))}
      </KanbanBoardColumn>
      <KanbanBoardColumn title="Завершенные" status={TASK_STATUSES.done}>
        {doneTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            index={index}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            // moveCard={moveCard}
          />
        ))}
      </KanbanBoardColumn>
    </KanbanBoardColumns>
  );
}

function getNewTasks(tasks) {
  return tasks.filter((task) => task.status === TASK_STATUSES.new);
}

function getInProgressTasks(tasks) {
  return tasks.filter((task) => task.status === TASK_STATUSES.inProgress);
}

function getDoneTasks(tasks) {
  return tasks.filter((task) => task.status === TASK_STATUSES.done);
}
