import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, TextField } from "@mui/material";
import logo from "../Resources/2018cbcagreenverticalfdic.png";
import { UnknownUser } from "../Util/Validation";
import { loginButton, loginStyling } from "../Util/Styling";
Login.propTypes = {
  setUserToken: PropTypes.func.isRequired,
};

function Login({ setUserToken }) {
  const [isValid, setIsValid] = useState(true);
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
    fetch("http://localhost:8080/bankuser/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          setUserToken(res.id);
        } else {
          setIsValid(false);
        }
      });
  };

  return (
    <div>
      <img alt="Commerce Bank" src={logo} height={100} width={405} />
      <form
        onSubmit={processForm}
        style={{ background: "#f0fff0", height: "90vh", minHeight: "90vh" }}
      >
        <Grid container style={loginStyling} rowSpacing={2} sx={{ marginTop: 10 }}>
          <h2 style={loginStyling}>Login</h2>
          <p style={loginStyling}>Please enter your username and password.</p>
          <Grid item xs={15}>
            <TextField
              required
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
              required
              label="Password"
              name="password"
              value={user.password}
              onChange={changeValue}
              type="password"
              variant="outlined"
              placeholder="Enter password"
            ></TextField>
          </Grid>
          {isValid ? <></> : <UnknownUser />}
          <Grid item xs={12}>
            <Button
              style={loginButton}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
