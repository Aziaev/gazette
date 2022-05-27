import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Divider, Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import ArticleEditor from "./ArticleEditor";
import SideMenuArticleItem from "./SideMenuArticleItem";
import SideMenuItem from "./SideMenuItem";

export default function SideMenu({ open, closeDrawer }) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [articles, setArticles] = useState([]);

  function openEditor() {
    setIsEditorOpen(true);
  }

  function closeEditor() {
    setIsEditorOpen(false);
  }

  return (
    <Box
      sx={{
        width: open ? "1px" : "250px",
        borderRight: "1px lightgrey solid",
        transition: "width 0.5s",
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
          <SideMenuItem
            title="Добавить картинку"
            icon={AddPhotoAlternateOutlinedIcon}
            openEditor={openEditor}
          />
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
          {articles.map((item) => (
            <SideMenuArticleItem id={item.id} item={item} />
          ))}
        </List>
      </Box>
      <ArticleEditor
        isEditorOpen={isEditorOpen}
        setArticles={setArticles}
        closeEditor={closeEditor}
      />
    </Box>
  );
}
