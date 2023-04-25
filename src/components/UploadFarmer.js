import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Uploadfarmer.css";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Cropnames, States, Seasons, District } from "./Crops-Places";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UploadFarmer() {
  const [cropname, setCropname] = useState("");
  const [season, setSeason] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [area, seaArea] = useState("");
  const [production, setProduction] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [profit, setProfit] = useState("");
  const [cropyield, setcropYield] = useState("");
  const [year, setYear] = useState("");
  const [responseDistrict, setResponseDistrict] = useState([]);

  const handleCropName = (e) => {
    setCropname(e.target.value);
  };

  const handleSeason = (e) => {
    setSeason(e.target.value);
  };

  const handleState = (e) => {
    setState(e.target.value);
    getDistricts(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleArea = (e) => {
    seaArea(e.target.value);
  };
  const handleProduction = (e) => {
    setProduction(parseInt(e.target.value));
  };
  const handleYield = (e) => {
    setcropYield(parseInt(e.target.value));
  };
  const handleRainfall = (e) => {
    setRainfall(parseInt(e.target.value));
  };
  const handleProfit = (e) => {
    setProfit(parseInt(e.target.value));
  };
  const handleYear = (e) => {
    setYear(parseInt(e.target.value));
  };
  const navigate = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    uploadSubmitform(
      cropname,
      season,
      state,
      district,
      area,
      production,
      cropyield,
      year,
      rainfall,
      profit
    )
      .then((token) => {
        navigate.push("/cropdata");
      })
      .catch((error) => {
        alert("error");
      });
  };

  const uploadSubmitform = async (
    cropname,
    season,
    state,
    district,
    area,
    production,
    cropyield,
    year,
    rainfall,
    profit
  ) => {
    const token = localStorage.getItem("token", token);
    console.log(token)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    const data = {
      crop_name: cropname,
      season_name: season,
      district_name: district,
      area: area,
      production: production,
      yeild_data: cropyield,
      profit: profit,
      rainfall: rainfall,
      year: year,
    };

    try {
      const response = await axios.post(
        `https://adt-crop.onrender.com/api/user/cropdata/add`,data,
        {headers}
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getDistricts = async (state) => {
    const token = localStorage.getItem("token", token);
    console.log(state);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `https://adt-crop.onrender.com/api/user/districts/${state}`,
        { headers }
      );
      console.log(response);
      setResponseDistrict(response.data.district);
      console.log(responseDistrict, "response distr");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <Typography gutterBottom variant="h5" align="center">
          Enter the Details
        </Typography>
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <form>
                <Grid container spacing={1}>
                  {/* <Grid item xs={12}>
                  <TextField placeholder="Select Crop Name" label="Crop Name" variant="outlined" fullWidth required onChange={(e) => handleCropName(e)} />
                </Grid> */}
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel id="crop-name-label">Crop Name</InputLabel>
                      <Select
                        labelId="crop-name-label"
                        id="crop-name"
                        onChange={(e) => handleCropName(e)}
                      >
                        {Cropnames.map((cropName) => (
                          <MenuItem key={cropName} value={cropName}>
                            {cropName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <TextField placeholder="Select Season" label="Season" variant="outlined" fullWidth required onChange={(e) => handleSeason(e)} /> */}
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel id="season-name-label">Season</InputLabel>
                      <Select
                        labelId="season-name-label"
                        id="season-name"
                        onChange={(e) => handleSeason(e)}
                      >
                        {Seasons.map((season) => (
                          <MenuItem key={season} value={season}>
                            {season}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={6} xm={12} item>
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel id="state-name-label">State</InputLabel>
                      <Select
                        labelId="state-name-label"
                        id="State-name"
                        onChange={(e) => handleState(e)}
                      >
                        {States.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={6} xm={12} item>
                
                    <FormControl variant="outlined" fullWidth required>
                      <InputLabel id="district-name-label">District</InputLabel>
                      <Select
                        labelId="district-name-label"
                        id="district-name"
                        onChange={(e) => handleDistrict(e)}
                      >
                        {responseDistrict.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Area"
                      label="Area"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => handleArea(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Production"
                      label="Production"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => handleProduction(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Yield"
                      label="Yield"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => handleYield(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Rainfall"
                      label="Rainfall"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => handleRainfall(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Profit"
                      label="Profit"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => handleProfit(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Year"
                      label="Year"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => handleYear(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "#10ddc4" }}
                      fullWidth
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </>
  );
}
