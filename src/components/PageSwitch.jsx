import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useNewspaperContext } from "../context/NewspaperContext";
import { clone } from "../utils";

export default function PageSwitch({ activePage, setActivePage }) {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, updateIssue } = useNewspaperContext();
  const issue = findIssueByIds(newspaperId, issueId);
  const { pages } = issue;

  function togglePage(e) {
    const page = e.target.id;
    setActivePage(page);
  }

  function addPageButtonHandler() {
    const clonedIssue = clone(issue);
    const { pages } = clonedIssue;

    clonedIssue.pages = [...pages, { articles: [] }];
    updateIssue(clonedIssue);
  }

  return (
    <Box sx={{ mt: "1rem" }}>
      {pages.map((page, index) => (
        <Button
          key={index}
          id={index}
          variant={
            String(activePage) === String(index) ? "outlined" : undefined
          }
          size="small"
          sx={{ mr: 1 }}
          onClick={togglePage}
        >
          Страница {index + 1}
        </Button>
      ))}
      {pages.length < 10 && (
        <Button size="small" onClick={addPageButtonHandler}>
          + Добавить страницу
        </Button>
      )}
    </Box>
  );
}
