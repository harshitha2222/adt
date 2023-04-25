import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from 'axios';
import {useHistory } from "react-router-dom";
import { useEffect } from "react";
import LoginNavbar from "../components/Navbar/LoginNavbar"
import { Grid, TextField, Button, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useHistory();
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  
  const submitForm = (e) => {
    e.preventDefault();
    loginUser(username, password)
      .then(token => {
        console.log(token)
        navigate.push("/cropdata")
      })
      .catch(error => {
        alert("error")
      });
    console.log(username, password);
  };
  
  const loginUser=(username, password)=> {
    return axios.post('https://adt-crop.onrender.com/api/user/login', { username, password })
      .then(response => {
        const token = response.data.access_token;
        console.log(token)
        localStorage.setItem('token', token);
        return token;
      });
  }

  return (
    <>
    <LoginNavbar />
      <div className="App">
        <Typography gutterBottom variant="h6" align="center">
          Login to your Account
        </Typography>
        <Grid>
          <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <form>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <TextField placeholder="Username" label="Enter Your Username" variant="outlined" fullWidth required onChange={(e) => handleUsername(e)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField placeholder="Password" label="Enter Your Password" type="password" variant="outlined" fullWidth required onChange={(e) => handlePassword(e)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: "#10ddc4" }} fullWidth onClick={submitForm}>Submit</Button>
                  </Grid>

                </Grid>
              </form>
              <p style={{ paddingLeft: "10px", marginTop: "20px" }}>
                Don't have an account ? <Link to="/signup"> Sign Up </Link>
              </p>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </>
  );
}
