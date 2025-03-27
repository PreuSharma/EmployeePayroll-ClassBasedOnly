import React, { Component } from "react";
import "../Navbar/Navbar.scss";
import Img from "../../assets/logo.jpg";
import { FaUserCircle } from "react-icons/fa";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      this.setState({ user: userData });
    }
  }
  toggleDropdown = () => {
    this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  render() {
    const { user, dropdownOpen } = this.state;

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

          {/* User Account Section */}
          <div className="navbar-user">
            {user ? (
              <div className="navbar-user-dropdown">
                <div className="user-icon" onClick={this.toggleDropdown}>
                  <FaUserCircle className="user-icon" size={30} />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item">{user.name}</div>
                    <div className="dropdown-item">{user.email}</div>
                    <div
                      className="dropdown-item logout"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-login-prompt">
                <FaUserCircle className="user-icon" size={30} />
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
