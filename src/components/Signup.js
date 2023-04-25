import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import LoginNavbar from "../components/Navbar/LoginNavbar"
import { Grid, TextField, Button, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

export default function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleDob = (e) => {
    setDob(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const createUser=(e)=>{
    e.preventDefault();
    alert("check")
    createUserFunc(userName,Password,firstName,lastName,dob,email,gender,phone)
      .then(token => {
        console.log(token)
        alert("registered successfully")
      })
      .catch(error => {
        alert("error")
      });
    console.log(userName,Password,firstName,lastName,dob,email,gender,phone)
  }

  const createUserFunc=(userName,Password,firstName,lastName,dob,email,gender,phone)=> {
    return axios.post('https://adt-crop.onrender.com/api/user/signup', { 
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password: Password,
      gender:gender,
      email: email,
      date_of_birth: dob,
      phone_number: phone
    })
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
      <div className="App" >
        <Typography gutterBottom variant="h6" align="center">
          Login to your Account
        </Typography>
        <Grid>
          <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="First name"
                      label="Enter your First Name"
                      variant="outlined"
                      name="fname"
                      onChange={handleFirstName}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Last Name"
                      label="Enter your Last Name"
                      variant="outlined"
                      name="lname"
                      onChange={handleLastName}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Enter your Username"
                      label="Enter your Username"
                      variant="outlined"

                      name="uname"
                      onChange={handleUsername}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      placeholder="Enter your email"
                      label="Provide your Email"
                      variant="outlined"
                      name="ename"
                      onChange={handleEmail}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Enter your Password"
                      label="Enter your Password"
                      variant="outlined"

                      name="password"
                      type="password"
                      onChange={handlePassword}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Phone Number"
                      label="Phone Number"
                      variant="outlined"

                      name="pnumber"
                      onChange={handlePhone}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Date of Birth"
                      // label="dob"
                      variant="outlined"

                      name="dob"
                      type="date"
                      onChange={handleDob}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Enter your gender"
                      label="Gender"
                      variant="outlined"

                      name="genderr"

                      fullWidth
                      onChange={handleGender}
                      required
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "#10ddc4" }}
                      name="Submit"
                      onClick={createUser}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <p style={{ paddingLeft: "10px", marginTop: "20px" }}>
                Do have an account ? <a href="/Login"> Login  </a>
              </p>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </>
  );
}
