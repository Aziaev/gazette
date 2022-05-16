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
import { useUserContext } from "../context/UserContext";
import Register from "./Register";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useUserContext();

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response = login({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (response.error) {
      setError(response.error);
    } else {
      navigate("/");
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
            Вход
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  navigate(Register.route);
                }}
                variant="body2"
              >
                Регистрация
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

Login.route = "/login";
