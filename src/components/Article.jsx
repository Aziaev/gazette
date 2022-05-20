import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, ListItemIcon, Menu } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";

export default function Article(props) {
  const { article, editArticle, deleteArticle } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showControl, setShowControl] = useState(false);

  function handleDeleteArticle() {
    deleteArticle(article);
    handleClose();
  }

  function handleEditArticle() {
    editArticle(article);
    handleClose();
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Box
      onMouseEnter={() => {
        setShowControl(true);
      }}
      onMouseLeave={() => {
        setShowControl(false);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={!article.headline ? { color: "lightgrey" } : {}}
        >
          {article.headline || "Нет заголовка"}
        </Typography>
        {showControl ? (
          <IconButton onClick={handleMenu}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        ) : (
          <Box
            sx={{ minWidth: "36px", height: "36px", alignSelf: "baseline" }}
          />
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDeleteArticle}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Удалить
          </MenuItem>
          <MenuItem onClick={handleEditArticle}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Изменить
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={article.text ? { mt: 1.5 } : { mt: 1.5, color: "lightgrey" }}>
        {article.text ? (
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(article.text),
            }}
          />
        ) : (
          "Нет текста"
        )}
      </Box>
    </Box>
  );
}
