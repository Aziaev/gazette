import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useDraftContext } from "../context/DraftContext";
import ArticleEditor from "./ArticleEditor";
import FileUploader from "./FileUploader";
import SideMenuArticleItem from "./SideMenuArticleItem";
import SideMenuItem from "./SideMenuItem";

export default function SideMenu({ open }) {
  const { drafts, addDraft, setDrafts } = useDraftContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  function openEditor() {
    setIsEditorOpen(true);
  }

  function closeEditor() {
    setIsEditorOpen(false);
  }

  function saveImage(item) {
    addDraft(item);
  }

  return (
    <Box
      sx={{
        minWidth: open ? "1px" : "250px",
        width: open ? "1px" : "250px",
        borderRight: "1px lightgrey solid",
        transition: "min-width 0.2s, width 0.2s",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ width: "250px" }}>
        <Typography
          variant="body1"
          gutterBottom
          component="div"
          sx={{ mt: 2, ml: 2, mr: 2 }}
        >
          Добавление материалов
        </Typography>
        <List>
          <SideMenuItem
            title="Добавить статью"
            icon={ArticleOutlinedIcon}
            openEditor={openEditor}
          />
          <FileUploader saveImage={saveImage} />
        </List>
        <Divider />
        <Typography
          variant="body1"
          gutterBottom
          component="div"
          sx={{ mt: 2, ml: 2, mr: 2 }}
        >
          Материалы
        </Typography>
        <List>
          {drafts.map((draft) => (
            <SideMenuArticleItem key={draft.id} draft={draft} />
          ))}
        </List>
      </Box>
      <ArticleEditor
        isEditorOpen={isEditorOpen}
        setArticles={setDrafts}
        closeEditor={closeEditor}
      />
    </Box>
  );
}
