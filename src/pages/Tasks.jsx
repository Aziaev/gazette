import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import shortid from "shortid";
import KanbanBoard from "../components/KanbanBoard";
import TaskEditDialog from "../components/TaskEditDialog";
import { useTasksContext } from "../context/TasksContext";
import { useUserContext } from "../context/UserContext";
import { clone } from "../utils";

const TASK_STATUSES = {
  new: "Новая",
  inProgress: "В работе",
  done: "Готово",
};

export default function Tasks() {
  const [error, setError] = useState(null);
  const { tasks, addTask, deleteTask, updateTask, findTaskById } =
    useTasksContext();
  const [task, setTask] = useState(null);
  const { user } = useUserContext();
  const { newspaperId } = useParams();

  function saveTask() {
    let result = {};
    if (task.id) {
      const clonedTask = clone(task);

      result = updateTask(clonedTask);
    } else {
      const createdTask = {
        ...task,
        id: shortid.generate(),
        creator: user,
        newspaperId,
        status: TASK_STATUSES.new,
      };

      result = addTask(createdTask);
    }

    if (result.error) {
      setError(result.error);
    } else {
      handleClose();
    }
  }

  function handleDeleteTask(e) {
    const currentId = e.currentTarget.id;
    deleteTask(currentId);
  }

  function handleEditTask(e) {
    const currentId = e.currentTarget.id;
    const task = findTaskById(currentId);
    const clonedTask = clone(task);
    setTask(clonedTask);
  }

  function handleOpen() {
    setTask({});
  }

  function handleClose() {
    setTask(null);
  }

  const list = useMemo(
    () => tasks.filter((task) => task.newspaperId === newspaperId),
    [newspaperId, tasks]
  );

  return (
    <>
      <KanbanBoard
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        tasks={list}
        handleOpen={handleOpen}
      />
      <TaskEditDialog task={task} saveTask={saveTask} setTask={setTask} />
      <Snackbar
        open={!!error}
        autoHideDuration={1500}
        onClose={() => setError(null)}
      >
        <MuiAlert severity="error">{error}</MuiAlert>
      </Snackbar>
    </>
  );
}

Tasks.route = "tasks";
