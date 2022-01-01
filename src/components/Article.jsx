import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import "../assets/css/articleCard.css";

export default function Article(props) {
  const { article, editArticle, deleteArticle } = props;
  const [anchorEl, setAnchorEl] = useState(null);

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
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={!article.headline && { color: "lightgrey" }}
        >
          {article.headline || "Нет заголовка"}
        </Typography>
        <Button
          onClick={handleMenu}
          variant="text"
          startIcon={<MoreVertIcon />}
        />
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
          <Button onClick={handleDeleteArticle} startIcon={<DeleteIcon />} />
          <Button onClick={handleEditArticle} startIcon={<EditIcon />} />
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
