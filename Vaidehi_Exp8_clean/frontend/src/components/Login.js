import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:8083/login", {
        username,
        password,
      });

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f0f2f5" }}
    >
      <Card style={{ minWidth: 360, padding: "16px", borderRadius: "12px" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            🔐 JWT Login
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Experiment 8 — Session-Based Authentication
          </Typography>

          {error && (
            <Alert severity="error" style={{ marginBottom: "12px" }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && login()}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "16px", borderRadius: "8px" }}
            onClick={login}
          >
            Login
          </Button>

          <Typography
            variant="caption"
            display="block"
            align="center"
            style={{ marginTop: "12px", color: "#888" }}
          >
            Try: admin / admin123 &nbsp;|&nbsp; vaidehi / user123
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
