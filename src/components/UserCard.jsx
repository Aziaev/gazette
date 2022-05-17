import { Delete } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, CardHeader, IconButton, ListItemIcon } from "@mui/material";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { stringAvatar } from "../utils";

export default function UserCard({ deleteUser, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = user.id;
  const { user: currentUser } = useUserContext();

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleClick = () => {
    deleteUser(id);
    handleClose();
  };

  const isCurrentUser = currentUser.id === user.id;

  return (
    <Card key={user.id} sx={{ width: 300, height: 70 }}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(user.name || "Unnamed")} />}
        action={
          !isCurrentUser ? (
            <IconButton aria-label="settings" onClick={handleOpen}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={`${user.name} ${isCurrentUser ? "(вы)" : ""}`}
        subheader={user.email}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Удалить
        </MenuItem>
      </Menu>
    </Card>
  );
}
