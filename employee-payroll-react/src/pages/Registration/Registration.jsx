import React, { Component } from "react";
import axios from "axios";
import "../Registration/Registration.scss";
import profileImg1 from "../../assets/img1.jpg";
import profileImg2 from "../../assets/img2.jpg";
import profileImg3 from "../../assets/img3.jpg";
import profileImg4 from "../../assets/img4.jpg";
import toast, { Toaster } from "react-hot-toast";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      profileImage: "",
      gender: "",
      departments: [],
      salary: "",
      startDate: "",
      notes: "",
      errors: {},
    };
  }

  componentDidMount() {
    const storedEmployee = localStorage.getItem("editEmployee");
    if (storedEmployee) {
      this.setState(JSON.parse(storedEmployee));
    }
  }



  validateForm = () => {
    let errors = {};
    const { name, profileImage, gender, departments, salary, startDate, notes } = this.state;

    if (!name.trim()) {
      errors.name = "*Name is required.";
    } else if (name.length < 3) {
      errors.name = "*Name must be at least 3 characters.";
    }

    if (!profileImage) {
      errors.profileImage = "*Please select a profile image.";
    }

    if (!gender) {
      errors.gender = "*Please select a gender.";
    }

    if (departments.length === 0) {
      errors.departments = "*Select at least one department.";
    }

    if (!salary) {
      errors.salary = "*Please select a salary.";
    }

    if (!startDate) {
      errors.startDate = "*Start date is required.";
    }

    if (notes.length > 200) {
      errors.notes = "*Notes should not exceed 200 characters.";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0; // Returns true if no errors
  };




  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      this.setState((prevState) => ({
        departments: checked
          ? [...prevState.departments, value]
          : prevState.departments.filter((dept) => dept !== value),
      }));
    } else {
      this.setState({ [name]: value });
    }


    this.setState({ notes: e.target.value });
    e.target.style.height = "auto"; 
    e.target.style.height = e.target.scrollHeight + "px"; 
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      return;
    }
  
    try {
      const dataToSend = { ...this.state };
      if (!this.state.id) {
        delete dataToSend.id;
      }
      if (this.state.id) {
        await axios.put(`http://localhost:3001/employees/${this.state.id}`, dataToSend);
        toast.success("Employee updated successfully!");
      } else {
        const response = await axios.post("http://localhost:3001/employees", dataToSend);
        toast.success("Employee added successfully!");
        console.log(response.data);
      }
      localStorage.removeItem("editEmployee");
      setTimeout(() => {
        window.location.href = "/homePage/dashboard";
      }, 1500); // Toast ke baad redirect delay karein
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Failed to save employee details");
    }
  };
  

  handleReset = () => {
    this.setState({
      id: null,
      name: "",
      profileImage: "",
      gender: "",
      departments: [],
      salary: "",
      startDate: "",
      notes: "",
    });
  };

  render() {
    return (
      
      <div className="registration-container">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="registration-form">
          <div className="registration-form-title">Employee Payroll Form</div>
          <main className="registration-form-cnt">
            <form onSubmit={this.handleSubmit}>
              <div className="form-cnt-name">
                <label className="label" htmlFor="name">Name:</label>
                <input
                id="name"
                className="form-cnt-name-textbox"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                
                />
              </div>
              {this.state.errors.name && <span className="error-message">{this.state.errors.name}</span>}


              <div className="form-cnt-profile">
                <label className="label" htmlFor="profileImg">Profile Image:</label>
                <div className="form-cnt-profile-imgradio">
                  <div className="profile-images-container">
                  {[profileImg1, profileImg2, profileImg3, profileImg4].map((img, index) => (
                    <label key={index} className="form-cnt-profile-imgradio-1">
                      <input
                        type="radio"
                        name="profileImage"
                        value={img}
                        checked={this.state.profileImage === img}
                        onChange={this.handleChange}
                        
                      />
                      <img className="radio-images" src={img} alt={`img${index + 1}`} />
                    </label>
                  ))}
                </div>
                </div>
              </div>
              {this.state.errors.profileImage && <span className="error-message">{this.state.errors.profileImage}</span>}



              <div className="form-cnt-gender">
                <label className="label" htmlFor="gender">Gender:</label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={this.state.gender === "male"}
                    onChange={this.handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={this.state.gender === "female"}
                    onChange={this.handleChange}
                  
                  />
                  Female
                </label>
              </div>
              {this.state.errors.gender && <span className="error-message">{this.state.errors.gender}</span>}


              <div className="form-cnt-department">
                <label className="label" htmlFor="department">Department:</label>
                {["HR", "Sales", "Finance", "Engineer", "Others"].map((dept) => (
                  <label id="labelDepartment" key={dept}>
                    <input
                      type="checkbox"
                      name="departments"
                      value={dept}
                      checked={this.state.departments.includes(dept)}
                      onChange={this.handleChange}
                    />
                    {dept}
                  </label>
                ))}
              </div>
              {this.state.errors.departments && <span className="error-message">{this.state.errors.departments}</span>}


              <div className="form-cnt-salary">
                <label className="label" htmlFor="salary">Salary:</label>
                <select id="salary" name="salary" value={this.state.salary} onChange={this.handleChange} >
                  <option value="">Select Salary</option>
                  {["10,000", "20,000", "30,000", "40,000"].map((sal) => (
                    <option key={sal} value={sal}>
                      {sal}
                    </option>
                  ))}
                </select>
              </div>
              {this.state.errors.salary && <span className="error-message">{this.state.errors.salary}</span>}


              <div className="form-cnt-salary-selectStartDate">
                <label className="label" htmlFor="startDate">Start Date:</label>
                <input id="startDate" className="dmy" type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange}  />
              </div>
              {this.state.errors.startDate && <span className="error-message">{this.state.errors.startDate}</span>}


              <div className="form-cnt-notes">
                <label className="label" htmlFor="notes">Notes:</label>
                <textarea id="notes" className="textarea" name="notes" value={this.state.notes} onChange={this.handleChange}></textarea>
                
              </div>

              <div className="form-cnt-buttons">
                <button type="button" id="cancelBtn" className="btn" onClick={() => (window.location.href = "/homePage/dashboard")}>Cancel</button>
                <div className="form-cnt-buttons-submitreset"><button type="submit" id="submitBtn" className="btn">{this.state.id ? "Update" : "Submit"}</button>
                <button type="reset" id="resetBtn" className="btn" onClick={this.handleReset}>Reset</button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    );
  }
}

export default Registration;
