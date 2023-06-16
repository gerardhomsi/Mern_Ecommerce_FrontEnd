import React, { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = isAuthenticated();

    if (authenticatedUser) {
      if (authenticatedUser.role === 1) {
        navigate.push("/admin/dashboard");
      } else if (authenticatedUser.role === 0) {
        navigate.push("/user/dashboard");
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  const inputFields = [
    {
      name: "username",
      value: username,
      type: "text",
      placeholder: "Username",
      icon: "person-fill",
      d: "M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    },

    {
      name: "email",
      value: email,
      type: "text",
      placeholder: "Email",
      icon: "envelope-fill",
      d: "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z",
    },

    {
      name: "password",
      value: password,
      type: "password",
      placeholder: "Password",
      icon: "file-lock-fill",
      d: "M7 6a1 1 0 0 1 2 0v1H7V6zM6 8.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3z M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z",
    },

    {
      name: "password2",
      value: password2,
      type: "password",
      placeholder: "Confirm Password",
      icon: "file-lock-fill",
      d: "M7 6a1 1 0 0 1 2 0v1H7V6zM6 8.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3z M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z",
    },
  ];

  // EVENT HANDLERSSS //
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* CLIENT SIDE VALIDATION */
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords DO NOT match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signup(data)
        .then((response) => {
          console.log(response);
          setFormData({
            ...formData,
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup err", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const showSignupForm = () => (
    <form onSubmit={handleSubmit}>
      {inputFields.map(({ name, value, type, placeholder, icon, d }) => (
        <div className="input-group mb-3" key={name}>
          <span className="input-group-text" id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className={`bi bi-${icon}`}
              viewBox="0 0 16 16"
            >
              <path d={d} />
            </svg>
          </span>
          <input
            name={name}
            value={value}
            type={type}
            className="form-control"
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="form-group  d-flex flex-column align-items-center">
        <button
          type="submit"
          className="btn btn-primary btn-block mt-1"
          style={{ width: "100%" }}
        >
          Signup
        </button>
        <p className="text-center text-white mt-2">
          Have an account? <Link to="/signin">Log in</Link>
        </p>
      </div>
    </form>
  );

  return (
    <div className="signup-container">
      <div className="row g-0 vh-100 px-3">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && showLoading()}
          {showSignupForm()}
          {/* {JSON.stringify(formData)} */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
