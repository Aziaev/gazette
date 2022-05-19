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
}) {
  const newTasks = getNewTasks(tasks);
  const inProgressTasks = getInProgressTasks(tasks);
  const doneTasks = getDoneTasks(tasks);

  return (
    <KanbanBoardColumns>
      <KanbanBoardColumn title="Новые задачи" status={TASK_STATUSES.new}>
        {newTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ))}
        <Button onClick={handleOpen} startIcon={<AddIcon />}>
          Добавить задачу
        </Button>
      </KanbanBoardColumn>
      <KanbanBoardColumn title="В работе" status={TASK_STATUSES.inProgress}>
        {inProgressTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ))}
      </KanbanBoardColumn>
      <KanbanBoardColumn title="Завершенные" status={TASK_STATUSES.done}>
        {doneTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
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
