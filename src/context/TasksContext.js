import { createContext, useContext } from "react";
import shortid from "shortid";
import { useLocalstorage } from "../utils";

/**
 * Контекст для работы с задачами.
 */
const TasksContext = createContext({
  tasks: [],

  addTask(task) {},
  deleteTask(taskId) {},
  updateTask(task) {},
});

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalstorage("tasks");

  function findTaskIndex(taskId) {
    return tasks.findIndex(({ id }) => taskId === id);
  }

  function addTask(task) {
    if (
      !task ||
      !task.title ||
      !task.description ||
      !task.assignee ||
      !task.creator
    ) {
      return {
        error: "Все поля обязательны",
      };
    }

    const newTask = { ...task, id: shortid.generate() };

    setTasks([...(tasks || []), newTask]);

    return {};
  }

  function deleteTask(taskId) {
    const tempTasks = [...tasks];

    const taskIndex = findTaskIndex(taskId);
    tempTasks.splice(taskIndex, 1);

    setTasks(tempTasks);
  }

  function updateTask(task) {
    setTasks((prevTasks) => {
      const tempTasks = [...prevTasks];

      const taskIndex = findTaskIndex(task.id);
      tempTasks.splice(taskIndex, 1, task);

      return tempTasks;
    });

    return {};
  }

  function findTaskById(taskId) {
    return (tasks || []).find(({ id }) => taskId === id);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks || [],

        addTask,
        deleteTask,
        updateTask,
        findTaskById,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext);
};
