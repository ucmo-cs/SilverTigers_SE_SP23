import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, TextField } from "@mui/material";
import logo from '../Resources/2018cbcagreenverticalfdic.png';
Login.propTypes = {
  setUserToken: PropTypes.func.isRequired,
};

function Login({ setUserToken }) {
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
    fetch("http://localhost:8080/bankuser/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        if (res !== null) {
          setUserToken(res.id); 
        } else {
          alert("Unknown user");
        }
      });
    console.log(user);
  };
const h2Style = {
    color: 'green',
    background: "#f0fff0",
    textAlign: 'center',
    width: 1500,
  };

  return (
  <div>
    <img src={logo} height={100} width={405} />
    <form onSubmit={processForm} style={{background: "#f0fff0", height: '90vh', minHeight: '90vh'}}>
      <Grid container style={h2Style} rowSpacing={2} sx={{marginTop: 10}}>
          <h2 style={h2Style}>Login</h2> 
          <h style={h2Style}>Please enter your username and password.</h> 
        <Grid item xs={15}>
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
          <Button style={{color: 'white', background: 'green',  width: '17.5%'}} variant="contained"  type="submit">
            Submit
          </Button>
          <p style={{color: 'green', background: "#f0fff0", textAlign: 'center', marginBottom: '10%'}}><u>Create Account</u></p>
        </Grid>
      </Grid>
    </form>
  </div>

  );
}

export default Login;
