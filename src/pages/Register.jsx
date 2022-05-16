import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Snackbar, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/UsersContext";
import Login from "./Login";

export default function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addUser } = useUsersContext();

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response = addUser({
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
    });

    if (response.error) {
      setError(response.error);
    } else {
      navigate(Login.route);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Электропочта"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Имя"
            name="name"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Регистрация
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  navigate(Login.route);
                }}
                variant="body2"
              >
                Вход
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={1500}
        onClose={() => setError(null)}
      >
        <MuiAlert severity="error">{error}</MuiAlert>
      </Snackbar>
    </Container>
  );
}

Register.route = "/register";
