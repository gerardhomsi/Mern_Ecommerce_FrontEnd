import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaTabletAlt,
  FaStoreAlt,
  FaShoppingCart,
} from "react-icons/fa";

const Header = () => {
  const isLoggedIn = isAuthenticated();
  let navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = (e) => {
    logout(() => {
      navigate("/signin");
    });
  };

  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          LOGO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isLoggedIn && (
              <Fragment>
                <NavItem to="/" text="Home" icon={<FaHome />} />
                <div className="d-flex align-items-center">
                  <NavItem to="/cart" text={"Cart"} icon={<FaShoppingCart />} />
                  <span className="badge bg-danger text-white ms-1">
                    {cart.length}
                  </span>
                </div>
                <NavItem to="/shop" text="Shop" icon={<FaStoreAlt />} />
                <NavItem to="/signup" text="SignUp" icon={<FaUserPlus />} />
                <NavItem to="/signin" text="SignIn" icon={<FaSignInAlt />} />
              </Fragment>
            )}
            {isLoggedIn && isLoggedIn.role === 0 && (
              <Fragment>
                <NavItem to="/" text="Home" icon={<FaHome />} />
                <NavItem to="/shop" text="Shop" icon={<FaStoreAlt />} />
                <div className="d-flex align-items-center">
                  <NavItem to="/cart" text={"Cart"} icon={<FaShoppingCart />} />
                  <span className="badge bg-danger text-white ms-1">
                    {cart.length}
                  </span>
                </div>
                <NavItem
                  to="/user/dashboard"
                  text="Dashboard"
                  icon={<FaTabletAlt />}
                />
              </Fragment>
            )}
            {isLoggedIn && isLoggedIn.role === 1 && (
              <Fragment>
                <NavItem to="/" text="Home" icon={<FaHome />} />
                <NavItem
                  to="/admin/dashboard"
                  text="Dashboard"
                  icon={<FaTabletAlt />}
                />
              </Fragment>
            )}
            {isLoggedIn && (
              <Fragment>
                <button
                  className="btn btn-link custom-red-text text-decoration-none px-1 text-start"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, text, icon }) => (
  <li className="nav-item">
    <Link to={to} className="nav-link" aria-current="page">
      {icon && <span className="icon p-1">{icon}</span>}
      {text}
    </Link>
  </li>
);

export default Header;
