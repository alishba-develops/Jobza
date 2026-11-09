import React from "react";
import "./Components.css";

function Addinfo(props) {
  const prev = () => {
    props.setaddinfo(false);
  };

  return (
    <div id="addinfo-outer">
      <div className="col-10" id="addinfo-form">
        <h3>Additional Information</h3>
        <button type="button" onClick={() => prev()}>
          Prev
        </button>
        <div className="form-group" id="ad-row1">
          <label for="exampleFormControlSelect1" className="col-6">
            Workplace
            <select class="form-control" id="exampleFormControlSelect1">
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </label>

          <label for="exampleFormControlSelect1" className="col-6">
            Category
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Web Development</option>
              <option>UX/UI Design</option>
              <option>Graphic Designing</option>
            </select>
          </label>
        </div>

        <label>Employment Type</label>
        <div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />
            <label class="form-check-label" for="inlineRadio1">
              Internship
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label class="form-check-label" for="inlineRadio2">
              Full-Time
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="option3"
            />
            <label class="form-check-label" for="inlineRadio3">
              Part-Time
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="option3"
            />
            <label class="form-check-label" for="inlineRadio3">
              Contract
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect1">Location</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect1">Select Company</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect1">Experience Level</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advance</option>
          </select>
        </div>

        <label>Salary</label>
        <div className="d-flex">
          <div className="d-flex" id="sal">
            <p id="sal-p"> PKR</p>
            <input placeholder="Max" id="sal-input" />
          </div>

          <div className="d-flex" id="sal">
            <p id="sal-p"> PKR</p>
            <input placeholder="Max" id="sal-input" />
          </div>

          <select class="form-control" id="exampleFormControlSelect1">
            <option>Per Year</option>
            <option>Per Month</option>
            <option>Per Day</option>
            <option>Per Hour</option>
          </select>
        </div>

        <label>Positions</label>
        <input type="number" placeholder="0" />
      </div>
    </div>
  );
}

export default Addinfo;
