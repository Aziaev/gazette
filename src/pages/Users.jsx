import Box from "@mui/material/Box";
import * as React from "react";
import UserCard from "../components/UserCard";
import { useUsersContext } from "../context/UsersContext";

export default function Users() {
  const { users, deleteUser } = useUsersContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexWrap: "wrap",
        alignContent: "flex-start",
      }}
    >
      {(users || []).map((user) => (
        <UserCard user={user} deleteUser={deleteUser} />
      ))}
    </Box>
  );
}

Users.route = "users";
