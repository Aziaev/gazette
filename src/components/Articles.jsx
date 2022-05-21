import Box from "@mui/material/Box";
import { convertFromRaw, EditorState } from "draft-js";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNewspaperContext } from "../context/NewspaperContext";
import { styled } from "@mui/material/styles";
import { clone, deleteArrayItemById } from "../utils";
import Article from "./Article";

// Заглушка-место для вставки статьи при изменении порядка статей
export const PLACEHOLDER = "placeholder";

export default function Articles({
  activePage,
  setEditedArticle,
  setEditorState,
  saveArticleImage,
}) {
  const { newspaperId, issueId } = useParams();
  const { findIssueByIds, updateIssue } = useNewspaperContext();
  const issue = findIssueByIds(newspaperId, issueId);
  const { pages, columns, headerSize, textSize } = issue;

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

  const articlesWithPlacers = useMemo(
    () =>
      articles.reduce(
        (result, article) => {
          return [...result, article, PLACEHOLDER];
        },
        [PLACEHOLDER]
      ),
    [articles]
  );

  const moveArticle = useCallback(
    (dragIndex, hoverIndex) => {
      const clonedIssue = clone(issue);
      const draggedArticle = articlesWithPlacers[dragIndex];

      articlesWithPlacers.splice(dragIndex, 1);
      articlesWithPlacers.splice(hoverIndex, 0, draggedArticle);

      clonedIssue.pages[activePage].articles = articlesWithPlacers.reduce(
        (result, article) => {
          if (article === PLACEHOLDER) {
            return result;
          }

          return [...result, article];
        },
        []
      );

      updateIssue(clonedIssue);
    },
    [activePage, articlesWithPlacers, issue, updateIssue]
  );

  return (
    <ArticlesContainer columns={columns} textSize={textSize}>
      {articlesWithPlacers.map((article, index) => {
        return (
          <Article
            key={index}
            index={index}
            article={article}
            headerSize={headerSize}
            editArticle={editArticle}
            deleteArticle={deleteArticle}
            saveArticleImage={saveArticleImage}
            moveArticle={moveArticle}
          />
        );
      })}
    </ArticlesContainer>
  );
}

const ArticlesContainer = styled(Box)`
  height: 100%;
  column-fill: auto;
  column-count: ${({ columns }) => columns};
  flex-grow: 1;

  p {
    font-size: ${({ textSize }) => textSize};
  }
`;
