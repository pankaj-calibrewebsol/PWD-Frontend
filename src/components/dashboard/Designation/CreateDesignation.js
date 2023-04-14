import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import routeNames from "../../../routes/routeName";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import { MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { DatePicker } from "antd";

const CreateDesignation = ({ mode, setCreationState, designationData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [officeTypeId, setofficeTypeId] = useState(0);

  const [officeTypeError, setOfficeTypeError] = useState("");
  const [designationName, setdesignationName] = useState("");
  const [designationNameError, setDesignationNameError] = useState("");
  const [designationShort, setdesignationShort] = useState("");
  const [designationShortError, setDesignationShortError] = useState("");
  const [designationOrderId, setdesignationOrderId] = useState("1");
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressError, setIpAddressError] = useState("");
  const [updateby, setupdateby] = useState(0);

  const jsonData = {
    updateby: "123",
  };

  // Convert the "updateby" field to an integer
  const updateByInt = parseInt(jsonData.updateby);

  if (isNaN(updateByInt)) {
    console.log("Error: Invalid value for 'updateby'");
  } else {
    console.log(`'updateby' as integer: ${updateByInt}`);
  }

  const [updateon, setupdateon] = useState(new Date()); // initialize with current date and time

  const jsonString = '{"isActive": true}';
  const jsonObject = JSON.parse(jsonString);

  console.log(jsonObject.isActive);

  const navigate = useNavigate();

  useEffect(() => {
    mode = location.state.mode;
    designationData = location.state.designationData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setofficeTypeId(designationData.officeTypeId);
      setdesignationName(designationData.designationName);
      setdesignationShort(designationData.designationShort);
      setdesignationOrderId(designationData.designationOrderId);
      setIsActive(designationData.isActive);
      setipAddress(designationData.ipAddress);
      setupdateby(designationData.updateby);
      setupdateon(designationData.updateon);
    }
  }, []);
  const handleChange2 = () => {

    setDesignationNameError(designationName.length < 3 ||
      designationName.length > 150 ? "Designation Name must be between 3 to 150 words" : "");
  }
  const handleChange1 = () => {
    setDesignationShortError(designationShort.length < 3 ||
      designationShort.length > 150 ? "Designation Short must be between 3 to 150 words" : "");
  }
  const handleSubmit = (e) => {
    e.preventDefault();


    setOfficeTypeError(officeTypeId === "" ? "OfficeType Id is Required / Only Enter Numeric Value" : "");
    setDesignationNameError(designationName === "" ? "Designation Name is Required" : "");
    setIpAddressError(ipAddress === "" ? "IP Address is Required" : "");
    setDesignationShortError(designationShort === "" ? "Designation Short Name is Required" : "");


    if (true) {
      const payload = {
        officeTypeId: officeTypeId,
        designationName: designationName,
        designationShort: designationShort,
        designationOrderId: designationOrderId,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Designation/SetDesignation`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Saved Sucessfully", "success");

            navigate(routeNames.DESIGNATION);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["designationId"] = location.state.designationData.designationId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Designation/UpdateDesignation`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Updated Sucessfully", "success");
            navigate(routeNames.DESIGNATION);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Designation</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Office Type Id
          </label>
          {officeTypeError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{officeTypeError}
            </p>
          )}
          <input


            type="number"
            value={officeTypeId}
            onChange={(e) => {
              setofficeTypeId(e.target.value);
              setOfficeTypeError("");

            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Designation Name
          </label>
          {designationNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{designationNameError}
            </p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={designationName}
            onChange={(e) => {
              setdesignationName(e.target.value);
              setDesignationNameError("");
              handleChange2()
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Designation Short
          </label>
          {designationShortError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{designationShortError}
            </p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={designationShort}
            onChange={(e) => {
              setdesignationShort(e.target.value);
              setDesignationShortError("");
              handleChange1()
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Designation Order Id
          </label>

          <input
            placeholder="enter value here"
            type="number"
            class="form-control"
            id="inputEmail3"
            value={designationOrderId}
            onChange={(e) => setdesignationOrderId(e.target.value)}
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            value={isActive}
            id="defaultCheck1"
          />
          <label class="form-check-label" for="defaultCheck1">
            IsActive
          </label>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            ipAddress
          </label>
          {ipAddressError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{ipAddressError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={ipAddress}
            onChange={(e) => {
              setipAddress(e.target.value);
              setIpAddressError("");

            }}
          />
        </div>
        {/* <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
          updateby
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={updateby}
            onChange={(e) => setupdateby(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
          updateon
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={updateon}
            onChange={(e) => setupdateon(e.target.value)}
          />
        </div> */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary A2"
        >
          {pageMode === Modes.create ? "Save" : "Update"}
        </button>
        &nbsp;
        <button class="btn btn-secondary me-md-5" type="button">
          <Link
            to={routeNames.DESIGNATION}
            style={{
              textDecoration: "none",
              color: "White",
              paddingBottom: "20px",
            }}
          >
            Cancel
          </Link>
        </button>
      </div>
    </div>
  );
};
export default CreateDesignation;
