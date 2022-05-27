import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export default function SideMenuItem({ icon: Icon, title, openEditor }) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={openEditor}>
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
