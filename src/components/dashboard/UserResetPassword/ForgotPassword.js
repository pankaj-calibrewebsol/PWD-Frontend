import { React, useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { Alert } from "react-bootstrap";
import { ClassSharp } from "@mui/icons-material";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Account/ForgetPassword?EmailId=${email}`
        );
        Swal.fire(res.data);
        navigate(routeNames.LOGIN);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (email === "") {
        setError("Please Enter Your Registered Email");
      } else {
        setError("This is Not Registered Email ID");
      }
    }
  };

  return (
    <div className="Auth-form-container1">
      <form className="Auth-form" onSubmit={handleReset}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Forgot Password</h3>
          {error !== "" ? (
            <Alert key={"danger"} variant={"danger"}>
              {error}
            </Alert>
          ) : (
            <div></div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              style={{ width: 324 }}
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleReset}>
              Send Mail
            </button>
            <p className="forgot-password text-right mt-2">
              <Link to={routeNames.LOGIN}> Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
