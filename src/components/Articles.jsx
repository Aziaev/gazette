import Box from "@mui/material/Box";
import { convertFromRaw, EditorState } from "draft-js";
import { useParams } from "react-router-dom";
import Article from "../components/Article";
import { useNewspaperContext } from "../context/NewspaperContext";
import { clone, deleteArrayItemById } from "../utils";
import ArticleImage from "./ArticleImage";

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

  return (
    <Box
      sx={{
        columnCount: columns,
        flexGrow: 1,
        height: "100%",
        columnFill: "auto",
        columnGap: 2,
      }}
    >
      {pages[activePage].articles.map((article, index) => {
        return article.base64 ? (
          <ArticleImage
            key={index}
            article={article}
            deleteArticle={deleteArticle}
          />
        ) : (
          <Article
            key={index}
            article={article}
            deleteArticle={deleteArticle}
            editArticle={editArticle}
          />
        );
      })}
    </Box>
  );
}
