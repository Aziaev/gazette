import { createContext, useContext } from "react";
import shortid from "shortid";
import { useLocalstorage } from "../utils";

/**
 * Контекст для работы со списком пользователей.
 */
const UsersContext = createContext({
  users: [],

  addUser(user) {},
  deleteUser(userId) {},
});

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useLocalstorage("users");

  function findUserIndex(userId) {
    return users.findIndex(({ id }) => userId === id);
  }

  function addUser(user) {
    if (
      !user ||
      !user.email ||
      !user.name ||
      !user.password ||
      (users || []).find(({ email }) => email === user.email)
    ) {
      return {
        error: "Неправильный логин или имя",
      };
    }

    const newUser = { ...user, id: shortid.generate() };

    setUsers([...(users || []), newUser]);

    return {};
  }

  function deleteUser(userId) {
    console.log(userId);
    const tempUsers = [...users];

    const userIndex = findUserIndex(userId);
    tempUsers.splice(userIndex, 1);

    setUsers(tempUsers);
  }

  function findUser(user) {
    return (users || []).find(({ email }) => email === user.email);
  }

  return (
    <UsersContext.Provider
      value={{
        users,

        addUser,
        deleteUser,
        findUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  return useContext(UsersContext);
};
