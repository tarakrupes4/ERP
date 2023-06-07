import { useState } from "react";
import { Grid, TextField, Button, Box, Container } from "@mui/material";
import axios from "axios";
import { error } from "console";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setLoggedIn: (value: boolean) => void
}

function Login({ setLoggedIn }: LoginProps) {
  const staff: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    staff.username = username;
    staff.password = password;
    axios
      .post("http://3.109.238.224:20080/login", staff)
      .then((response) => {
        setLoggedIn(true);
        navigate("inward");
        console.log(true);
        const authToken = response.data.substring(
          response.data.indexOf("Bearer"),
          response.data.indexOf("}")
        );
        localStorage.setItem("authToken", authToken);
      })
      .catch((error) => {
        console.log(error);
        alert(error)
      });
  };
  return (
    <Container maxWidth="sm">

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          width: "50vh",
          marginTop: "20vh",
          marginLeft: "10vh",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          padding: "16px",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <h2>Log <span>in</span></h2>
          </Grid>
          <Grid item>
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="username"
                    type="email"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
