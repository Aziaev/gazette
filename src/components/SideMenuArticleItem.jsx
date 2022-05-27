import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageIcon from "@mui/icons-material/Image";
import { ImageListItem } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export default function SideMenuArticleItem({ item }) {
  if (!item.base64) {
    return (
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ImageListItem>
            <img
              src="https://wallbox.ru/resize/640x960/wallpapers/main/201401/28acddf2a708c6b.jpg"
              alt={item.id}
              loading="lazy"
            />
          </ImageListItem>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <ArticleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={item.headline} />
      </ListItemButton>
    </ListItem>
  );
}
