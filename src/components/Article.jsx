import Box from "@mui/material/Box";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNewspaperContext } from "../context/NewspaperContext";
import { clone } from "../utils";
import ArticleImage from "./ArticleImage";
import ArticleText from "./ArticleText";

export default function Article(props) {
  const {
    article,
    article: { base64 },
    index,
    editArticle,
    deleteArticle,
    issue,
    activePage,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showControl, setShowControl] = useState(false);
  const ref = useRef(null);
  const { updateIssue } = useNewspaperContext();

  const moveArticle = useCallback(
    (dragIndex, hoverIndex) => {
      const clonedIssue = clone(issue);
      const currentPageArticles = clonedIssue.pages[activePage].articles;
      const draggedArtice = currentPageArticles[dragIndex];

      currentPageArticles.splice(dragIndex, 1);
      currentPageArticles.splice(hoverIndex, 0, draggedArtice);

      updateIssue(clonedIssue);
    },
    [activePage, issue, updateIssue]
  );

  const [{ handlerId, canDrop }, drop] = useDrop({
    accept: "article",
    collect(monitor) {
      const canDrop = monitor.isOver();

      return {
        handlerId: monitor.getHandlerId(),
        canDrop,
      };
    },
    drop(item, monitor) {
      console.log("DROP", item);

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        moveArticle(dragIndex, hoverIndex);
      }

      return undefined;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "article",
    item: () => {
      return { ...article, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  function handleDeleteArticle() {
    deleteArticle(article);
    closeMenu();
  }

  function handleEditArticle() {
    editArticle(article);
    closeMenu();
  }

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <div
      onMouseEnter={() => {
        setShowControl(true);
      }}
      onMouseLeave={() => {
        setShowControl(false);
      }}
      ref={ref}
      data-handler-id={handlerId}
      style={{
        breakInside: base64 ? "avoid-column" : undefined,
      }}
    >
      {base64 ? (
        <ArticleImage
          article={article}
          showControl={showControl}
          handleDeleteArticle={handleDeleteArticle}
          anchorEl={anchorEl}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />
      ) : (
        <ArticleText
          article={article}
          showControl={showControl}
          handleDeleteArticle={handleDeleteArticle}
          handleEditArticle={handleEditArticle}
          anchorEl={anchorEl}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />
      )}
      <Box sx={{ height: "18px" }}>
        {!isDragging && canDrop && (
          <hr style={{ margin: 0, border: "2px orange dashed" }} />
        )}
      </Box>
    </div>
  );
}
