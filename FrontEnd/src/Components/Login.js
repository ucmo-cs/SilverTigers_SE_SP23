import { useState } from "react";
import React from "react";
import { Grid, Button, TextField, Container } from "@mui/material";

function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const processForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/bankuser/" + user.username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }); /*
      .then((res) => {
        console.log(1, res);
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        if (res !== null) {
          props.history.push("/login");
        } else {
          alert("fails");
        }
      });*/
    console.log(user);
  };

  return (
    <div>
      <form onSubmit={processForm}>
        <Grid container rowSpacing={1} sx={{marginTop: 50, marginLeft: 100}}>
            <h2>Commerce Bank</h2>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={changeValue}
              type="text"
              variant="outlined"
              placeholder="Enter Username"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={user.password}
              onChange={changeValue}
              type="password"
              variant="outlined"
              placeholder="Enter password"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
