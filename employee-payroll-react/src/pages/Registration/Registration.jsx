import React, { Component } from "react";
import "../Registration/Registration.scss";
import profileImg1 from "../../assets/img1.jpg";
import profileImg2 from "../../assets/img2.jpg"; 
import profileImg3 from "../../assets/img3.jpg"; 
import profileImg4 from "../../assets/img4.jpg"; 

export class Registration extends Component {
  render() {
    return (
      <div className="registration-container">


          <div className="registration-form">

            <div className="registration-form-title">Employee Payroll Form</div>

            <main className="registration-form-cnt">

              <form>

                <div className="form-cnt-name">
                  <div><label className="label">Name:</label></div>
                  <div><input type="text" id="form-cnt-name-textbox" required /></div>
                </div>



                <div class="form-cnt-profile">
                  <div><label className="label">Profile Image:</label></div>

                  <div className="form-cnt-profile-imgradio">

                  <div class="form-cnt-profile-imgradio-1">
                    <div class="radio-btn">
                      <input type="radio" class="radioProfile" name="profileImage" value="img1"/>
                    </div>

                    <div>
                      <img className="radio-images" src={profileImg1} alt="img1"/>
                    </div>
                  </div>

                  <div class="form-cnt-profile-imgradio-2">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img2"
                      />
                    </div>

                    <div>
                    <img className="radio-images" src={profileImg2} alt="img2"/>
                    </div>
                  </div>

                  <div class="form-cnt-profile-imgradio-3">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img3"
                      />
                    </div>

                    <div>
                    <img className="radio-images" src={profileImg3} alt="img3"/>
                    </div>
                  </div>

                  <div class="form-cnt-profile-imgradio-4">
                    <div class="radio-btn">
                      <input
                        type="radio"
                        class="radioProfile"
                        name="profileImage"
                        value="img4"
                      />
                    </div>

                    <div>
                    <img className="radio-images" src={profileImg4} alt="img4"/>
                    </div>
                  </div>
                </div>
                </div>





                <div class="form-cnt-gender">
                  

                  <div><label className="label">Gender:</label></div>

                  <div className="form-cnt-gender-radiolabels">

                  <div class="form-cnt-gender-radiolabels-1">
                   <div><input type="radio" name="gender" value="male" /></div>
                    <div>Male</div>
                  </div>

                  <div class="form-cnt-gender-radiolabels-2">
                    <div><input type="radio" name="gender" value="female" /></div>
                    <div>Female</div>
                  </div>

                  </div>


                </div>





                <div class="form-cnt-department">

                  <label className="label">Department:</label>

                  <div className="form-cnt-department-checkbox">

                  <div class="form-cnt-department-checkbox-1">
                    <div><input type="checkbox" name="departments" value="HR" /></div>
                    <div>HR</div>
                  </div>
                  <div class="form-cnt-department-checkbox-2">
                    <div><input type="checkbox" name="departments" value="Sales" /></div>
                    <div>Sales</div>
                  </div>
                  <div class="form-cnt-department-checkbox-3">
                    <div><input type="checkbox" name="departments" value="Finance" /></div>
                    <div>Finance</div>
                  </div>
                  <div class="form-cnt-department-checkbox-4">
                    <div><input type="checkbox" name="departments" value="Engineer" /></div>
                    <div>Engineer</div>
                  </div>
                  <div class="form-cnt-department-checkbox-5">
                    <div><input type="checkbox" name="departments" value="Others" /></div>
                    <div>Others</div>
                  </div>
                  </div>
                </div>




                <div class="form-cnt-salary">
                  <div><label className="label">Salary:</label></div>
                  
                  <div class="form-cnt-salary-selectSalary">
                    <select id="salary">
                      <option className="options">Select Salary</option>
                      <option value="10,000">10,000</option>
                      <option value="20,000">20,000</option>
                      <option value="30,000">30,000</option>
                      <option value="40,000">40,000</option>
                    </select>
                  </div>
                </div>

                <div class="form-cnt-salary-selectStartDate">
                  <div><label className="label">Start Date:</label></div>

                  <div className="form-cnt-salary-selectStartDate-dmy">
                  <div class="startDate">
                    <select id="startDay" className="dmy">
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
                    <select id="startMonth" className="dmy">
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
                    <select id="startYear" className="dmy">
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
                </div>





                <div class="form-cnt-notes">
                  <div><label className="label">Notes:</label></div>
                  
                  <div class="form-cnt-notesTextArea">
                    <textarea  class="textarea" id="notes"/>
                  </div>
                </div>


                <div class="form-cnt-buttons">

                  <div class="form-cnt-buttons-cancel">
                    <button class="btn" type="button">Cancel</button>
                  </div>

                  <div className="form-cnt-buttons-submitreset">
                    <div class="form-cnt-buttons-submit">
                      <button class="btn" type="submit">Submit</button>
                    </div>
                    <div class="form-cnt-buttons-reset">
                      <button class="btn" type="reset">Reset</button>
                    </div>
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
