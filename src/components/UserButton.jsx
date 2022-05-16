import { Logout } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, ListItemIcon } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function UserButton() {
  const { logout, user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick() {
    logout();
    handleClose();
  }

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Avatar onClick={handleOpen}>
        <AccountCircleIcon />
      </Avatar>
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
            <Logout fontSize="small" />
          </ListItemIcon>
          Выход
        </MenuItem>
      </Menu>
    </>
  );
}
