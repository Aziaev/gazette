import { createContext, useCallback, useContext } from "react";
import shortid from "shortid";
import { clone, useLocalstorage } from "../utils";

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

  const findTaskIndex = useCallback((tasks, taskId) => {
    return tasks.findIndex(({ id }) => taskId === id);
  }, []);

  const addTask = useCallback(
    (task) => {
      if (
        !task ||
        !task.title ||
        !task.description ||
        !task.assignee ||
        !task.type ||
        !task.creator
      ) {
        return {
          error: "Все поля обязательны",
        };
      }

      const newTask = { ...task, id: shortid.generate() };

      setTasks([...(tasks || []), newTask]);

      return {};
    },
    [tasks, setTasks]
  );

  function deleteTask(taskId) {
    setTasks((prev) => {
      const tempTasks = clone(prev);

      const taskIndex = findTaskIndex(tempTasks, taskId);
      tempTasks.splice(taskIndex, 1);

      return tempTasks;
    });
  }

  const updateTask = useCallback(
    (task) => {
      setTasks((prevTasks) => {
        const clonedTasks = clone(prevTasks);

        const taskIndex = findTaskIndex(clonedTasks, task.id);
        clonedTasks.splice(taskIndex, 1, task);

        return clonedTasks;
      });

      return {};
    },
    [findTaskIndex, setTasks]
  );

  const findTaskById = useCallback(
    (taskId) => {
      return (tasks || []).find(({ id }) => taskId === id);
    },
    [tasks]
  );

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
