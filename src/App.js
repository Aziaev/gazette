import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewspaperContext from "./context/NewspaperContext";
import useNewspaperProvider from "./hooks";
import Issue from "./pages/Issue";
import Main from "./pages/Main";
import Newspaper from "./pages/Newspaper";
import Newspapers from "./pages/Newspapers";

/**
 * Роуты приложения.
 */
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Newspapers />} />
          <Route
            path={`/${Newspaper.route}/:newspaperId`}
            element={<Newspaper />}
          >
            <Route
              path={`/${Newspaper.route}/:newspaperId/${Issue.route}/:issueId`}
              element={<Issue />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/**
 * Базовая верстка страницы.
 */
function Layout() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ height: "100vh" }} display="flex" flexDirection="column">
          <AppRoutes />
        </Box>
      </Container>
    </>
  );
}

/**
 * Подключение контекста данных.
 */
export default function App() {
  const newspaperProviderValue = useNewspaperProvider();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <NewspaperContext.Provider value={newspaperProviderValue}>
        <Layout />
      </NewspaperContext.Provider>
    </LocalizationProvider>
  );
}
