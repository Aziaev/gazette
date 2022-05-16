import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavItem from "../components/NavItem";
import NavSplitter from "../components/NavSplitter";
import UserButton from "../components/UserButton";
import { useNewspaperContext } from "../context/NewspaperContext";
import { formatDate } from "../utils";
import Newspaper from "./Newspaper";

export default function Layout() {
  const { pathname } = useLocation();
  const { newspaperId, issueId } = useParams();
  const { findNewspaperById, findIssueByIds, findIssueNumberByIds } =
    useNewspaperContext();
  const newspaper = findNewspaperById(newspaperId);
  const issue = findIssueByIds(newspaperId, issueId);
  const issueNumber = findIssueNumberByIds(newspaperId, issueId);
  const isMainRoute = pathname === Layout.route;
  const isNewspaperRoute = newspaperId && !issueId;

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
          {newspaper && newspaperId && (
            <>
              <NavSplitter />
              <NavItem
                isRouteActive={isNewspaperRoute}
                path={`/${Newspaper.route}/${newspaperId}`}
                text={`Газета "${newspaper.name}"`}
              />
            </>
          )}
          {issue && issueId && (
            <>
              <NavSplitter />
              <NavItem
                isRouteActive={issueId}
                text={`Выпуск №${issueNumber} от ${formatDate(issue.date)}`}
              />
            </>
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
