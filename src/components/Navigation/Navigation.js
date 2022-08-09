import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { useNavigate } from "react-router-dom";
function Navigation() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar p-0 fixed-top d-fl ex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center"></div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-menu"></span>
          </button>{" "}
          <h1 style={{ padding: "8px", fontWeight: "bolder" }}>Time Logger</h1>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                id="profileDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <div className="navbar-profile">
                  <img
                    className="img-xs rounded-circle"
                    src="../static_1/assets/images/faces/face15.jpg"
                    alt=""
                  />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">
                    Admin
                  </p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="profileDropdown"
              >
                <div className="dropdown-divider"></div>

                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1" onClick={HandleLogout}>
                      Log out
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
