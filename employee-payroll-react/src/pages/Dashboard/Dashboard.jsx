import React, { Component } from "react";
import $ from "jquery"; // Import jQuery
import "../Dashboard/Dashboard.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Default CSS

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      searchQuery: "",
      showSearch: false, 
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    $.get("http://localhost:3001/employees", (data) => {
      this.setState({ employees: data.reverse() });
    });
  };

  handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    this.setState({ searchQuery: query }, () => {
      $.get("http://localhost:3001/employees", (data) => {
        const filteredData = data.filter((employee) =>
          employee.name.toLowerCase().includes(query) ||
          employee.gender.toLowerCase().includes(query) ||
          employee.departments.some((dept) => dept.toLowerCase().includes(query)) ||
          employee.salary.toLowerCase().includes(query)
        );
        this.setState({ employees: filteredData });
      });
    });
  };

  handleEdit = (employee) => {
    localStorage.setItem("editEmployee", JSON.stringify(employee)); 
    window.location.href = "/homePage/registration"; 
  };

  handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this employee?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            $.ajax({
              url: `http://localhost:3001/employees/${id}`,
              type: "DELETE",
              success: () => {
                toast.success("Employee deleted successfully!");
                this.fetchEmployees();
              },
              error: () => {
                toast.error("Failed to delete employee.");
              },
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  toggleSearch = () => {
    this.setState((prevState) => ({ showSearch: !prevState.showSearch }));
  };

  render() {
    return (
      <div className="container">
         <Toaster position="top-right" reverseOrder={false} />
        <div className="emp-reg-header-main-cnt">
          <div className="emp-details">
            <h4>Employee Details</h4>
          </div>
          <div className="search">
            {this.state.showSearch && (
              <input
                type="text"
                placeholder="Search"
                className="searchArea"
                onChange={this.handleSearch}
              />
            )}
            <button className="search-btn" aria-label="Search" onClick={this.toggleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="addUser">
            <h4>
              <button
                className="h4-btn-addUser"
                onClick={() => (window.location.href = "/homePage/registration")}
              >
                <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;&nbsp;ADD USER
              </button>
            </h4>
          </div>
        </div>

        <div className="emp-reg-main-cnt">
          <table className="emp-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.length > 0 ? (
                this.state.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      {employee.profileImage ? (
                        <img
                          src={employee.profileImage}
                          alt="Profile"
                          className="profile-image"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.departments.map((dept, index) => (
                        <span key={index} className={`department-badge ${dept.toLowerCase()}`}>
                          {dept}
                        </span>
                      ))}</td>
                    <td>{employee.salary}</td>
                    <td>
                      {new Date(employee.startDate).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => this.handleEdit(employee)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => this.handleDelete(employee.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No employee data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Dashboard;
