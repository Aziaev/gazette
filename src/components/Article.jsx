import Box from "@mui/material/Box";
import * as React from "react";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TASK_STATUSES } from "../constants";
import { useDraftContext } from "../context/DraftContext";
import { useTasksContext } from "../context/TasksContext";
import ArticleImage from "./ArticleImage";
import { PLACEHOLDER } from "./Articles";
import ArticleText from "./ArticleText";

export default function Article(props) {
  const {
    article,
    editArticle,
    deleteArticle,
    headerSize,
    index,
    moveArticle,
    moveDraft,
    saveArticleImage,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showControl, setShowControl] = useState(false);
  const ref = useRef(null);
  const isImage = article.base64;
  const isPlaceholder = article === PLACEHOLDER;
  const { deleteDraft } = useDraftContext();
  const { updateTask } = useTasksContext();

  const [{ handlerId, isDragging }, drop] = useDrop({
    accept: ["article", "draft"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isDragging:
          monitor.getItemType() === "article" ||
          monitor.getItemType() === "draft",
      };
    },
    drop(item) {
      const { index: dragIndex, task } = item;
      console.log(item);
      const hoverIndex = index;

      if (!isPlaceholder) {
        return undefined;
      }

      if (dragIndex && dragIndex !== hoverIndex) {
        moveArticle(dragIndex, hoverIndex);
      }

      if (!dragIndex) {
        moveDraft(item, hoverIndex);
        deleteDraft(item);
      }

      if (task) {
        updateTask({ ...task, status: TASK_STATUSES.done });
      }

      return undefined;
    },
  });

  const [_, drag] = useDrag({
    type: isPlaceholder ? PLACEHOLDER : "article",
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
        breakInside: isImage ? "avoid-column" : undefined,
        display: "flex",
        flexDirection: "column",
        columnSpan: isImage ? article.columnSpan : undefined,
        marginBottom: isImage && article.columnSpan ? "16px" : undefined,
      }}
    >
      {isPlaceholder ? (
        <Box
          sx={{
            height: "18px",
            backgroundColor: isDragging ? "orange" : "",
          }}
        />
      ) : (
        <>
          {isImage ? (
            <ArticleImage
              article={article}
              showControl={showControl}
              handleDeleteArticle={handleDeleteArticle}
              saveArticleImage={saveArticleImage}
              anchorEl={anchorEl}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          ) : (
            <ArticleText
              article={article}
              headerSize={headerSize}
              showControl={showControl}
              handleDeleteArticle={handleDeleteArticle}
              handleEditArticle={handleEditArticle}
              anchorEl={anchorEl}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          )}
        </>
      )}
    </div>
  );
}
