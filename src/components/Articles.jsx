import Box from "@mui/material/Box";
import { convertFromRaw, EditorState } from "draft-js";
import { useParams } from "react-router-dom";
import { useNewspaperContext } from "../context/NewspaperContext";
import { clone, deleteArrayItemById } from "../utils";
import Article from "./Article";

export default function Articles({
  activePage,
  setEditedArticle,
  setEditorState,
}) {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, updateIssue } = useNewspaperContext();
  const issue = findIssueByIds(newspaperId, issueId);
  const { pages, columns } = issue;

  function deleteArticle(article) {
    const clonedIssue = clone(issue);

    deleteArrayItemById(clonedIssue.pages[activePage].articles, article.id);

    updateIssue(clonedIssue);
  }

  function editArticle(article) {
    const clonedArticle = clone(article);
    if (clonedArticle.text) {
      const contentState = convertFromRaw(clonedArticle.text);
      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);
    }
    setEditedArticle(clonedArticle);
  }

  const articles = pages[activePage].articles;

  return (
    <Box
      sx={{
        columnCount: columns,
        flexGrow: 1,
        height: "100%",
        columnFill: "auto",
      }}
    >
      {articles.map((article, index) => {
        return (
          <Article
            key={index}
            index={index}
            activePage={activePage}
            issue={issue}
            article={article}
            deleteArticle={deleteArticle}
            editArticle={editArticle}
          />
        );
      })}
    </Box>
  );
}
