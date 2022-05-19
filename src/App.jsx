import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { NewspaperContextProvider } from "./context/NewspaperContext";
import { TasksContextProvider } from "./context/TasksContext";
import { UserContextProvider } from "./context/UserContext";
import { UsersContextProvider } from "./context/UsersContext";
import { CheckAuth } from "./pages/CheckAuth";
import Issue from "./pages/Issue";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import { Main } from "./pages/Main";
import Newspaper from "./pages/Newspaper";
import NewspaperIndex from "./pages/NewspaperIndex";
import Newspapers from "./pages/Newspapers";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";

/**
 * Роуты приложения.
 */
function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={Login.route} element={<Login />} />
          <Route path={Register.route} element={<Register />} />
          <Route path="/" element={<CheckAuth />}>
            <Route path={Newspapers.route} element={<Outlet />}>
              <Route path={`:newspaperId`} element={<Newspaper />}>
                <Route path={`${Issue.route}/:issueId`} element={<Issue />} />
                <Route path={Tasks.route} element={<Tasks />} />
                <Route index element={<NewspaperIndex />} />
              </Route>
              <Route index element={<Newspapers />} />
            </Route>
            <Route path={Users.route} element={<Users />} />
            <Route index element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

/**
 * Подключение контекста данных.
 */
export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UsersContextProvider>
        <UserContextProvider>
          <NewspaperContextProvider>
            <TasksContextProvider>
              <DndProvider backend={HTML5Backend}>
                <CssBaseline />
                <Container maxWidth="xl" disableGutters>
                  <Box
                    sx={{ height: "100vh" }}
                    display="flex"
                    flexDirection="column"
                  >
                    <AppRoutes />
                  </Box>
                </Container>
              </DndProvider>
            </TasksContextProvider>
          </NewspaperContextProvider>
        </UserContextProvider>
      </UsersContextProvider>
    </LocalizationProvider>
  );
}
