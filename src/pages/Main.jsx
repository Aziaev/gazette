import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Login from "./Login";
import Newspapers from "./Newspapers";
import Tasks from "./Tasks";
import Users from "./Users";

export function Main() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Login.route);
    }
  }, [navigate, user]);

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();

            navigate(Newspapers.route);
          }}
          variant="h5"
        >
          Издания
        </Link>
      </Box>
      <Box sx={{ mr: 4 }}>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();

            navigate(Tasks.route);
          }}
          variant="h5"
        >
          Задачи
        </Link>
      </Box>
      <Box>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();

            navigate(Users.route);
          }}
          variant="h5"
        >
          Пользователи
        </Link>
      </Box>
    </>
  );
}
