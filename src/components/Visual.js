import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Uploadfarmer.css";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import "./Visual.css";
import { Cropnames, States, Seasons, District } from "./Crops-Places";
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
// import BarGraph from "./BarGraph";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

export default function Visual() {
    const [district_name, setDistrict] = useState("");
    const [viz, setViz] = useState([]);
    const [prof, setProf] = useState([]);
    const [prod, setProd] = useState([]);
    const [bdis, setBdis] = useState(false);
    const [bprof, setBprof] = useState(false);
    const [bprod, setBprod] = useState(false);
    const [state, setState] = useState("");
    const [responseDistrict, setResponseDistrict] = useState([]);

    const handlechange = (e) => {
        setDistrict(e.target.value);
    };
    const handleState = (e) => {
        setState(e.target.value);
        getDistricts(e.target.value);
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

    const submitDistrict = () => {
        console.log(district_name);
        const fetchData = async () => {
            const token = localStorage.getItem("token", token);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const data = { district_name: district_name };
            console.log(district_name, headers);
            const response = await axios.post(
                "https://adt-crop.onrender.com/api/user/crop/visualize",
                data,
                { headers }
            );
            console.log(response.data.data, "response");
            setViz(response.data.data);
            console.log(viz, "viz");
            setBdis(true)
            setProf(false)
            setProd(false)
        };
        fetchData();
    };

    const submitProfit = () => {
        console.log(district_name);
        const fetchData = async () => {
            const token = localStorage.getItem("token", token);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const data = { district_name: district_name };
            console.log(district_name, headers);
            const response = await axios.post(
                "https://adt-crop.onrender.com/api/user/crop/visualize",
                data,
                { headers }
            );
            console.log(response.data.data, "response");
            setProf(response.data.data);
            console.log(prof, "prof");
            setBprof(true)
            setBdis(false)
            setProd(false)
        };
        fetchData();
    };

    const submitProduction = () => {
        console.log(district_name);
        const fetchData = async () => {
            const token = localStorage.getItem("token", token);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const data = { district_name: district_name };
            console.log(district_name, headers);
            const response = await axios.post(
                "https://adt-crop.onrender.com/api/user/crop/visualize",
                data,
                { headers }
            );
            console.log(response.data.data, "response");
            setProd(response.data.data);
            console.log(prod, "prod");
            setBprod(true)
            setBdis(false)
            setProf(false)

        };
        fetchData();
    };

    return (
        <>
            <Navbar />
            <div className="App">
                <Typography gutterBottom variant="h5" align="center">
                    VISUALIZATION
                </Typography>
                <Grid>
                    <Card
                        style={{ maxWidth: 1000, padding: "20px 5px", margin: "0 auto" }}
                    >
                        <CardContent>
                            <Grid container spacing={1}>
                            {/* <Grid xs={6} xm={12}>
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
                                </Grid> */}
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
                            {/* <Grid xs={6} xm={12} item>
                                <FormControl variant="outlined" fullWidth required>
                                    <InputLabel id="district-name-label">District</InputLabel>
                                    <Select
                                        labelId="district-name-label"
                                        id="district-name"
                                        onChange={(e) => handlechange(e)}
                                    >
                                        {responseDistrict.map((district) => (
                                            <MenuItem key={district} value={district}>
                                                {district}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </Grid> */}
                                <Grid xs={6} xm={12} item>

                                    <FormControl variant="outlined" fullWidth required>
                                        <InputLabel id="district-name-label">District</InputLabel>
                                        <Select
                                            labelId="district-name-label"
                                            id="district-name"
                                            onChange={(e) => handlechange(e)}
                                        >
                                            {responseDistrict.map((district) => (
                                                <MenuItem key={district} value={district}>
                                                    {district}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* <div className="container">
                                <Button className="button"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ backgroundColor: "#10ddc4" }}
                                    fullWidth
                                    onClick={() => submitDistrict()}
                                >
                                    Yield Data
                                </Button>
                                <Button className="button"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ backgroundColor: "#10ddc4" }}
                                    fullWidth
                                    onClick={() => submitProfit()}
                                >
                                    Profit
                                </Button>
                                <Button className="button"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ backgroundColor: "#10ddc4" }}
                                    fullWidth
                                    onClick={() => submitProduction()}
                                >
                                    Production
                                </Button>

                            </div> */}
                            <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button className="button"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: "#10ddc4" }}
                                        fullWidth
                                        onClick={() => submitDistrict()}
                                    >
                                        Yield Data
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button className="button"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: "#10ddc4" }}
                                        fullWidth
                                        onClick={() => submitProfit()}
                                    >
                                        Profit
                                    </Button>
                                </Grid>
                                  <Grid item xs={12} sm={6} md={4}>
                                    <Button className="button"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: "#10ddc4" }}
                                        fullWidth
                                        onClick={() => submitProduction()}
                                    >
                                        Production
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </CardContent>
                    </Card>
                    
                </Grid>
                

                {(bdis || bprof || bprod) &&
                    <Grid>
                    <Card style={{ maxWidth: 1000, padding: "20px 5px", margin: "0 auto" }}>
                        <CardContent>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {bdis && <BarChart
                                    width={600}
                                    height={400}
                                    data={viz}
                                    layout="vertical"
                                    margin={{ top: 40, right: 30, left: 100, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="crop_name" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="yield_data" fill="#8884d8" />
                                </BarChart>
                                }
                                {bprof &&
                                    <BarChart
                                        width={600}
                                        height={400}
                                        data={prof}
                                        layout="vertical"
                                        margin={{ top: 40, right: 30, left: 100, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="crop_name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="profit" fill="#8884d8" />
                                    </BarChart>}

                                {bprod &&
                                    <BarChart
                                        width={600}
                                        height={400}
                                        data={prod}
                                        layout="vertical"
                                        margin={{ top: 40, right: 30, left: 100, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="crop_name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="yield_data" fill="#8884d8" />
                                    </BarChart>}
                            </div>
                        </CardContent>

                    </Card>
                    </Grid>
                }
            </div>
        </>
    );
}
