import React, { Component } from "react";
import "../Registration/Registration.scss";
// import profileImg1 from "../../assets/img1.jpg";
// import profileImg2 from "../../assets/img2.jpg"; 
// import profileImg3 from "../../assets/img3.jpg"; 
// import profileImg4 from "../../assets/img4.jpg"; 

export class Registration extends Component {
  render() {
    return (
      <div className="registration-container">


        <div className="registration-form-container">

          <div className="registration-form">

            <div className="registration-form-title">Employee Payroll Form</div>

            {/* <main className="registration-form-cnt">

              <form>

                <div className="form-cnt-name">
                  <div><label className="label">Name:</label></div>
                  <div><input type="text" id="form-cnt-name-textbox" required /></div>
                </div>



                <div class="form-cnt-profile">
                  <div><label className="label">Profile Image:</label></div>

                  <div className="form-cnt-profile-imgradio">

                  <div class="profileimg-1">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img1"
                      />
                    </div>

                    <div class="radio-image">
                      <img src={profileImg1} alt="img1"/>
                    </div>
                  </div>

                  <div class="profileimg-2">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img2"
                      />
                    </div>

                    <div class="radio-image">
                    <img src={profileImg2} alt="img2"/>
                    </div>
                  </div>

                  <div class="profileimg-3">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img3"
                      />
                    </div>

                    <div class="radio-image">
                    <img src={profileImg3} alt="img3"/>
                    </div>
                  </div>

                  <div class="profileimg-4">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img4"
                      />
                    </div>

                    <div class="radio-image">
                    <img src={profileImg4} alt="img4"/>
                    </div>
                  </div>
                </div>
                </div>

                <div class="formGender">
                  <label className="label">Gender:</label>
                  <div class="genderMale">
                    <input type="radio" name="gender" value="male" />
                    <h6>Male</h6>
                  </div>
                  <div class="genderFemale">
                    <input type="radio" name="gender" value="female" />
                    <h6>Female</h6>
                  </div>
                </div>

                <div class="formDepartment">
                  <label className="label">Department:</label>
                  <div class="DepartmentHR">
                    <input type="checkbox" name="departments" value="HR" />
                    HR
                  </div>
                  <div class="DepartmentSales">
                    <input type="checkbox" name="departments" value="Sales" />
                    Sales
                  </div>
                  <div class="DepartmentFinance">
                    <input type="checkbox" name="departments" value="Finance" />
                    Finance
                  </div>
                  <div class="DepartmentEngineer">
                    <input
                      type="checkbox"
                      name="departments"
                      value="Engineer"
                    />
                    Engineer
                  </div>
                  <div class="DepartmentOthers">
                    <input type="checkbox" name="departments" value="Others" />
                    Others
                  </div>
                </div>

                <div class="formSalary">
                  <label className="label">Salary:</label>
                  <div class="selectSalary">
                    <select id="salary">
                      <option>Select Salary</option>
                      <option value="10,000">10,000</option>
                      <option value="20,000">20,000</option>
                      <option value="30,000">30,000</option>
                      <option value="40,000">40,000</option>
                    </select>
                  </div>
                </div>

                <div class="formStartDate">
                  <label className="label">Start Date:</label>
                  <div class="startDate">
                    <select id="startDay">
                      <option>Date</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
                    </select>
                  </div>

                  <div class="startMonth">
                    <select id="startMonth">
                      <option>Month</option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                  </div>

                  <div class="startYear">
                    <select id="startYear">
                      <option>Year</option>
                      <option>2016</option>
                      <option>2017</option>
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                    </select>
                  </div>
                </div>

                <div class="notes">
                  <label className="label">Notes:</label>
                  <div class="notesTextArea">
                    <textarea class="textarea" id="notes"></textarea>
                  </div>
                </div>

                <div class="emp-reg-btn-cnt">
                  <div class="regCancelButton">
                    <button
                      class="btn"
                      type="button"
                      onclick="window.location.href='employeeDashboard.html'"
                    >
                      Cancel
                    </button>
                  </div>
                  <div class="regSubmitButton">
                    <button class="btn" type="submit">
                      Submit
                    </button>
                  </div>
                  <div class="regResetButton">
                    <button class="btn" type="reset">
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </main> */}
          </div>
          
        </div>


      </div>
    );
  }
}

export default Registration;
