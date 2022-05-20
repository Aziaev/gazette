import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ListItemIcon,
  Menu,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import "../assets/css/articleCard.css";

export default function ArticleImage(props) {
  const { article, deleteArticle } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showControl, setShowControl] = useState(false);

  function handleDeleteArticle() {
    deleteArticle(article);
    handleClose();
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <ImageListItem
      onMouseEnter={() => {
        setShowControl(true);
      }}
      onMouseLeave={() => {
        setShowControl(false);
      }}
      sx={{
        pageBreakInside: "avoid",
        breakInside: "avoid-column",
      }}
    >
      <img src={article.base64} alt="articleImage" />
      {showControl && (
        <ImageListItemBar
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, " +
              "rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
          }}
          position="top"
          actionIcon={
            <IconButton onClick={handleMenu} sx={{ color: "white" }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          }
          actionPosition="right"
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
      </Menu>
    </ImageListItem>
  );
}
