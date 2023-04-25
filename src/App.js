import React from "react";
import "./styles.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import FarmerForm from "./components/UploadFarmer";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CropData from "./components/CropData";
import Visual from "./components/Visual";

function App() {
  return (
    
    <div className="App">
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/uploadFarmer" component={FarmerForm} exact />
        <Route path="/Navbar" component={Navbar} exact />
        <Route path="/cropdata" component={CropData} exact />
        <Route path="/visual" component={Visual} exact/>
        <Route path="/Login" component={Login} exact />
        <Route path="/" component={Login} exact />
        <Route component={Error} />
      </Switch>
    </div>

  );
}

export default App;
