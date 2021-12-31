import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavItem from "../components/NavItem";
import NavSplitter from "../components/NavSplitter";
import NewspaperContext from "../context/NewspaperContext";
import { formatDate } from "../utils";
import Newspaper from "./Newspaper";

export default function Main() {
  const { pathname } = useLocation();

  const { newspaperId, issueId } = useParams();
  const { findNewspaperById, findIssueByIds, findIssueNumberByIds } =
    useContext(NewspaperContext);
  const newspaper = findNewspaperById(newspaperId);
  const issue = findIssueByIds(newspaperId, issueId);
  const issueNumber = findIssueNumberByIds(newspaperId, issueId);

  const isMainRoute = pathname === Main.route;
  const isNewspaperRoute = newspaperId && !issueId;

  return (
    <>
      <Navbar>
        <NavItem
          isRouteActive={isMainRoute}
          variant="h4"
          path={Main.route}
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

Main.route = "/";
