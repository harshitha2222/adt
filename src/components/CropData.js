import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./CropData.css";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import {useHistory } from "react-router-dom";

export default function CropData() {
  const [isValid, setIsValid] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useHistory();
  const [formState, setFormState] = useState({
    crop_id:"",
    cropname: "",
    season: "",
    district: "",
    area: "",
    production: "",
    yield: "",
    profit: "",
    rainfall: "",
    year: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token", token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://adt-crop.onrender.com/api/user/myentries",
        { headers }
      );
      setRows(response.data.crop);
      console.log(response);
      //   console.log(rows)
    };
    fetchData();
  }, []);

  const handleDeleteRow = (crop_id) => {
    alert(crop_id);
    const fetchData = async () => {
      const token = localStorage.getItem("token", token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        "https://adt-crop.onrender.com/api/user/delete/cropdata",
        { headers, data: { crop_id: crop_id } }
      );
      console.log(response);
    };
    fetchData();
  };

  const handleValidation = (row) => {
    setIsValid(true);
    alert(row.cropdataid);
  };

  const handlemodalchange = (e) => {
    console.log("Into the modalchange file");
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const SubmitForm = (formState) => {
    alert(formState.profit);
    const fetchData = async () => {
      const token = localStorage.getItem("token", token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data ={
        crop_id: formState.crop_id,
        crop_name: formState.cropname,
        season_name: formState.season,
        district_name: formState.district,
        area: parseInt(formState.area),
        production: parseInt(formState.production),
        yeild_data: parseInt(formState.yield),
        profit: parseInt(formState.profit),
        rainfall: parseInt(formState.rainfall),
        year: parseInt(formState.year)
      }
      const response = await axios.put(
        "https://adt-crop.onrender.com/api/user/update/cropdata", data,
        {headers}
      );
      console.log(response);
    };
    fetchData();
  };

  return (
    <>
      <Navbar />
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
            <th>Crop ID</th>
              <th>Crop Name</th>
              <th>Season</th>
              <th>District</th>
              <th>Area</th>
              <th>Production</th>
              <th>Yield</th>
              <th>Profit</th>
              <th>Rainfall</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.cropdataid}</td>
                <td>{row.crop_name}</td>
                <td>{row.season_name}</td>
                <td>{row.district_name}</td>
                <td>{row.area}</td>
                <td>{row.production}</td>
                <td>{row.yield_data}</td>
                <td>{row.profit}</td>
                <td>{row.rainfall}</td>
                <td>{row.year}</td>
                <td>
                  <span className="actions">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => handleValidation(row)}
                    />
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => handleDeleteRow(row.cropdataid)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isValid && (
          <div className="modal-container">
            <div className="modal">
              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <TextField
                      placeholder="Crop ID"
                      label="crop_id"
                      variant="outlined"
                      name="crop_id"
                      value={formState.crop_id}
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                
                    <TextField
                      placeholder="Select Crop Name"
                      label="Crop Name"
                      variant="outlined"
                      name="cropname"
                      value={formState.cropname}
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Select Season"
                      label="Season"
                      variant="outlined"
                      value={formState.season}
                      name="season"
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      placeholder="Select District"
                      label="District"
                      variant="outlined"
                      value={formState.district}
                      name="district"
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Area"
                      label="Area"
                      variant="outlined"
                      value={formState.area}
                      name="area"
                      type="number"
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Production"
                      label="Production"
                      variant="outlined"
                      value={formState.production}
                      name="production"
                      type="number"
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Yield"
                      label="Yield"
                      variant="outlined"
                      value ={parseInt(formState.yield)}
                    //   value={formState.yield}
                      name="yield"
                      type="number"
                      onChange={handlemodalchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Year"
                      label="Year"
                      variant="outlined"
                      value={formState.year}
                      name="year"
                      type="number"
                      fullWidth
                      onChange={handlemodalchange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Rainfall"
                      label="Rainfall"
                      variant="outlined"
                      name="rainfall"
                      type="number"
                      value={formState.rainfall}
                      fullWidth
                      onChange={handlemodalchange}
                      required
                    />
                  </Grid> 
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Profit"
                      label="profit"
                      variant="outlined"
                      
                      value={formState.profit}
                      name="profit"
                      type="number"
                      onChange={handlemodalchange}
                      fullWidth
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
                      onClick={() => SubmitForm(formState)}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
