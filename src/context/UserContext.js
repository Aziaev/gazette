import { createContext, useContext } from "react";
import { useLocalstorage } from "../utils";
import { useUsersContext } from "./UsersContext";

/**
 * Контекст для работы со списком пользователей.
 */
const UserContext = createContext({
  users: [],

  addUser(user) {},
  deleteUser(userId) {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useLocalstorage("user", null);
  const { findUserByEmail } = useUsersContext();

  function login(user) {
    const existingUser = findUserByEmail(user) || {};

    if (existingUser.password !== user.password) {
      return { error: "Неправильный логин или пароль" };
    } else {
      setUser(existingUser);
    }

    return {};
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,

        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
