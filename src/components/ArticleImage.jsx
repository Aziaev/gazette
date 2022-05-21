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

export default function ArticleImage(props) {
  const {
    article,
    showControl,
    handleDeleteArticle,
    anchorEl,
    openMenu,
    closeMenu,
  } = props;

  return (
    <ImageListItem>
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
            <IconButton onClick={openMenu} sx={{ color: "white" }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          }
          actionPosition="right"
        />
      )}
      <Menu
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
        onClose={closeMenu}
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
