import Box from "@mui/material/Box";
import * as React from "react";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
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
    saveArticleImage,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showControl, setShowControl] = useState(false);
  const ref = useRef(null);
  const isImage = article.base64;
  const isPlaceholder = article === PLACEHOLDER;

  const [{ handlerId, isDragging2 }, drop] = useDrop({
    accept: "article",
    collect(monitor) {
      const item = monitor.getItem();
      const dragIndex = item && item.index;

      const hoverIndex = index;

      const canDrop = monitor.isOver();
      const dropForward = dragIndex ? hoverIndex > dragIndex : null;
      const dropBackward = dragIndex ? hoverIndex < dragIndex : null;

      return {
        handlerId: monitor.getHandlerId(),
        isDragging2: monitor.getItemType() === "article",
        canDrop,
        dropForward,
        dropBackward,
      };
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (isPlaceholder && dragIndex !== hoverIndex) {
        moveArticle(dragIndex, hoverIndex);
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
      }}
    >
      {isPlaceholder ? (
        <Box
          sx={{
            height: "18px",
            backgroundColor: isDragging2 ? "orange" : "",
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
