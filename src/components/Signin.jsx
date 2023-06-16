import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { showErrorMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signin } from "../api/auth";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

const Signin = () => {
  // useNavigate replaces useHistory now.
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authenticatedUser = isAuthenticated();

    if (authenticatedUser) {
      if (authenticatedUser.role === 1) {
        navigate("/admin/dashboard");
      } else if (authenticatedUser.role === 0) {
        navigate("/user/dashboard");
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  const inputFields = [
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
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* CLIENT SIDE VALIDATION */
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signin(data)
        .then((res) => {
          setAuthentication(res.data.token, res.data.user);

          const redirect = location.search.split("=")[1];

          if (isAuthenticated() && isAuthenticated().role === 1) {
            navigate.push("/admin/dashboard");
          } else if (
            isAuthenticated() &&
            isAuthenticated().role === 0 &&
            !redirect
          ) {
            navigate("/user/dashboard");
          } else {
            navigate("/shipping");
          }
        })
        .catch((err) => {
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const showSigninForm = () => (
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
          Signin
        </button>
        <p className="text-center text-white mt-2">
          Don't Have an account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </form>
  );

  return (
    <div className="signin-container">
      <div className="row g-0 vh-100 px-3">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && showLoading()}
          {showSigninForm()}
          {/* {JSON.stringify(formData)} */}
        </div>
      </div>
    </div>
  );
};

export default Signin;
