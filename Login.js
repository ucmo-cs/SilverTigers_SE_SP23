import { useState } from "react";
import React from "react";
import { Grid, Button, TextField, Container } from "@mui/material";
import { AlignHorizontalCenter, LogoDev, PaddingRounded } from "@mui/icons-material";
import cblogo from './2018cbcagreenverticalfdic.png';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { width } from '@mui/system';


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
  const h2Style = {
    color: 'green',
    background: "#f0fff0",
    textAlign: 'center',
    /*padding: '10px',*/
    width: 1280
  };

  return (
    <div >
      <form onSubmit={processForm}>
        <img src={cblogo} height={100} width={405} />
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
            <p style={{color: 'green', background: "#f0fff0", textAlign: 'center', marginBottom: '7%'}}>Create Account</p>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Login;
