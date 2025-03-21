import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Outlet/>
      </div>
    );
  }
}

export default HomePage;