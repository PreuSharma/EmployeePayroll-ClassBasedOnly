import React, { Component } from "react";
import "../Navbar/Navbar.scss";
import Img from "../../assets/logo.jpg";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        

        <div className="emp-reg-header-cnt">

          <div className="logo">
            <img className="img-logo" src={Img} alt="Company Logo" />
          </div>

          <div className="emp">
            <div>EMPLOYEE</div>
            <div className="brPayroll">PAYROLL</div>
          </div>

        </div>
      </div>
    );
  }
}
