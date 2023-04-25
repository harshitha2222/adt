import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import './Navbarstyle.css'
// import login from './components/Login'
// import logo from "../Images/Croplogo.png"
import crop_logo from "../Navbar/crop_logo.jpg"

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className="NavbarItems" style={{ marginBottom: "100px" }}>
                <img src={crop_logo}
                    className="logocss" />
                <h1 className="navbarName" href="http://localhost:3004/">Crop Production</h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fa-solid fa-bars'}></i>
                </div>
                <ul className="navMenu" >
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        )
    }
}

export default Navbar 