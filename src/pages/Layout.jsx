import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../components/Navbar";
import NavItem from "../components/NavItem";
import UserButton from "../components/UserButton";
import { useNewspaperContext } from "../context/NewspaperContext";
import { formatDate } from "../utils";
import Newspapers from "./Newspapers";
import Tasks from "./Tasks";
import Users from "./Users";

export default function Layout() {
  const { pathname } = useLocation();
  const { newspaperId, issueId } = useParams();
  const { findNewspaperById, findIssueByIds, findIssueNumberByIds } =
    useNewspaperContext();
  const newspaper = findNewspaperById(newspaperId);
  const issue = findIssueByIds(newspaperId, issueId);
  const issueNumber = findIssueNumberByIds(newspaperId, issueId);
  const isMainRoute = pathname === Layout.route;
  const isNewspapersRoute = pathname === `/${Newspapers.route}`;
  const isNewspaperRoute = newspaperId && !issueId;
  const isTasksRoute = pathname.includes(Tasks.route);
  const isUsersRoute = pathname === `/${Users.route}`;

  return (
    <>
      <Navbar>
        <Box display="flex" flexDirection="row" alignItems="center">
          <NavItem
            isRouteActive={isMainRoute}
            variant="h4"
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
      </Navbar>
      <Box sx={{ padding: "1rem", flexGrow: 1, display: "flex" }}>
        <Outlet />
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          padding: "1rem",
          borderTop: "1px lightgrey dashed",
        }}
      >
        <Typography variant="caption" display="block" gutterBottom>
          {issue
            ? `Выпуск №${issueNumber} от ${formatDate(issue.date)}`
            : "Редакция"}
        </Typography>
      </Box>
    </>
  );
}

Layout.route = "/";
