import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { NewspaperContextProvider } from "./context/NewspaperContext";
import { UserContextProvider } from "./context/UserContext";
import { UsersContextProvider } from "./context/UsersContext";
import { CheckAuth } from "./pages/CheckAuth";
import Issue from "./pages/Issue";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import { Main } from "./pages/Main";
import Newspaper from "./pages/Newspaper";
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
              </Route>
              <Route index element={<Newspapers />} />
            </Route>
            <Route path={Tasks.route} element={<Tasks />} />
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
          </NewspaperContextProvider>
        </UserContextProvider>
      </UsersContextProvider>
    </LocalizationProvider>
  );
}
