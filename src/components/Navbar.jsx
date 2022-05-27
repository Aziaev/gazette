import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNewspaperContext } from "../context/NewspaperContext";
import Layout from "../pages/Layout";
import Newspapers from "../pages/Newspapers";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";
import { formatDate } from "../utils";
import Breadcrumb from "./Breadcrumb";
import NavItem from "./NavItem";
import UserButton from "./UserButton";

export default function Navbar({ open, openDrawer, closeDrawer }) {
  const { pathname } = useLocation();
  const { findNewspaperById, findIssueByIds, findIssueNumberByIds } =
    useNewspaperContext();
  const { newspaperId, issueId } = useParams();
  const issue = findIssueByIds(newspaperId, issueId);
  const issueNumber = findIssueNumberByIds(newspaperId, issueId);
  const newspaper = findNewspaperById(newspaperId);
  const isMainRoute = pathname === Layout.route;
  const isNewspapersRoute = pathname === `/${Newspapers.route}`;
  const isNewspaperRoute = newspaperId && !issueId;
  const isTasksRoute = pathname.includes(Tasks.route);
  const isUsersRoute = pathname === `/${Users.route}`;

  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: "1rem",
        alignItems: "center",
        borderBottom: "1px lightgrey dashed",
      }}
      display="flex"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <IconButton
          color="primary"
          component="span"
          onClick={open ? closeDrawer : openDrawer}
          sx={{ mr: 1 }}
        >
          {open ? <ArrowBackIosNewIcon /> : <MenuIcon />}
        </IconButton>
        <NavItem
          isRouteActive={isMainRoute}
          variant="h5"
          path={Layout.route}
          text="Издательство"
        />
        {isUsersRoute && (
          <Breadcrumb
            path={Users.route}
            text="Пользователи"
            isRouteActive={isUsersRoute}
          />
        )}
        {(isNewspapersRoute || (newspaper && newspaperId)) && (
          <Breadcrumb
            path={Newspapers.route}
            text="Газеты"
            isRouteActive={isNewspapersRoute}
          />
        )}
        {newspaper && newspaperId && (
          <Breadcrumb
            path={`${Newspapers.route}/${newspaperId}`}
            text={`Газета "${newspaper.name}"`}
            isRouteActive={isNewspaperRoute && !isTasksRoute}
          />
        )}
        {isTasksRoute && (
          <Breadcrumb
            path={Tasks.route}
            text="Задачи"
            isRouteActive={isTasksRoute}
          />
        )}
        {issue && issueId && (
          <Breadcrumb
            path={`${Newspapers.route}/${newspaperId}`}
            text={`Выпуск №${issueNumber} от ${formatDate(issue.date)}`}
            isRouteActive={issueId}
          />
        )}
      </Box>
      <Box>
        <UserButton />
      </Box>
    </Box>
  );
}
