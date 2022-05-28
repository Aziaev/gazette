import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageIcon from "@mui/icons-material/Image";
import { ImageListItem } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export default function SideMenuArticleItem({ draft }) {
  const ref = useRef(null);

  const [_, drag] = useDrag({
    type: "draft",
    item: () => {
      return draft;
    },
  });

  drag(ref);

  const Content = draft.base64 ? (
    <ImageListItem>
      <img src={draft.base64} alt={draft.id} loading="lazy" />
    </ImageListItem>
  ) : (
    <ListItemText primary={draft.headline} />
  );

  const Icon = draft.base64 ? <ImageIcon /> : <ArticleOutlinedIcon />;

  return (
    <ListItem ref={ref} disablePadding>
      <ListItemButton>
        <ListItemIcon>{Icon}</ListItemIcon>
        {Content}
      </ListItemButton>
    </ListItem>
  );
}
