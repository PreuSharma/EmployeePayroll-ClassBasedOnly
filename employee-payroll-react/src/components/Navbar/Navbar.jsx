import React, { Component } from "react";
import "../Navbar/Navbar.scss";
import Img from "../../assets/logo.jpg";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div>
            <img src={Img} alt="Company Logo" />
          </div>
          <div className="navbar-employee-payroll">
            <div>EMPLOYEE</div>
            <div className="navbar-brPayroll">PAYROLL</div>
          </div>
        </div>
      </nav>
    );
  }
}
