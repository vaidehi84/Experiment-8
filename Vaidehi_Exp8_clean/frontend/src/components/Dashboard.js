import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
  Chip,
} from "@mui/material";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const getData = async () => {
    setError("");
    try {
      const res = await axios.get("http://localhost:8083/protected", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Token expired or invalid. Please login again.");
      } else {
        setError("Failed to fetch protected data.");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "48px", maxWidth: "700px" }}
    >
      <Card style={{ borderRadius: "12px", padding: "8px" }}>
        <CardContent>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "16px" }}
          >
            <Typography variant="h5">🛡️ Protected Dashboard</Typography>
            <Chip label="Authenticated" color="success" variant="outlined" />
          </div>

          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
          >
            Experiment 8 — Frontend Integration with JWT APIs
          </Typography>

          <hr />

          <Typography variant="subtitle2" style={{ marginBottom: "8px" }}>
            🔑 Session Token (stored in sessionStorage):
          </Typography>
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: "6px",
              padding: "10px",
              wordBreak: "break-all",
              fontSize: "11px",
              marginBottom: "20px",
              color: "#555",
            }}
          >
            {token}
          </div>

          <div className="d-flex gap-2" style={{ marginBottom: "20px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={getData}
              style={{ borderRadius: "8px" }}
            >
              Fetch Protected Data
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              style={{ borderRadius: "8px", marginLeft: "12px" }}
            >
              Logout
            </Button>
          </div>

          {error && <Alert severity="error">{error}</Alert>}

          {data && (
            <Alert severity="success" style={{ marginTop: "8px" }}>
              <strong>Response from /protected:</strong>
              <br />
              {typeof data === "object" ? JSON.stringify(data) : data}
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
