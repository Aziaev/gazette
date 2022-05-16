import { CircularProgress } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Login from "./Login";

export function CheckAuth() {
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

  return <Outlet />;
}
