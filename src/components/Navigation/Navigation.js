import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { useNavigate } from "react-router-dom";
function Navigation() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.clear();
    // sessionStorage.clear()
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar p-0 fixed-top d-fl ex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          {/* <a className="navbar-brand brand-logo-mini" href="index.html">
            <img src="../static_1/assets/images/logo-mini.svg" alt="logo" />
          </a> */}
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-menu"></span>
          </button>{" "}
          <img
            className="sand"
            src="../static_1/assets/sandClock.webp"
            alt=""
          />
          <h1 style={{ padding: "8px",fontStyle: "italic",fontFamily: "cursive",marginLeft:"-2%" }}>Time Logger</h1>
          {/* <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products"
                />
              </form>
            </li>
          </ul> */}
          <ul className="navbar-nav navbar-nav-right">
            {/* <li className="nav-item dropdown d-none d-lg-block">
              <a
                className="nav-link btn btn-success create-new-button"
                id="createbuttonDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                + Create New Project
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="createbuttonDropdown"
              >
                <h6 className="p-3 mb-0">Projects</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-file-outline text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Software Development
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-web text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      UI Development
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-layers text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Software Testing
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">See all projects</p>
              </div>
            </li> */}
            {/* <li className="nav-item nav-settings d-none d-lg-block">
              <a className="nav-link" href="#">
                <i className="mdi mdi-view-grid"></i>
              </a>
            </li> */}
            {/* <li className="nav-item dropdown border-left">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="messageDropdown"
                href="#"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="mdi mdi-email"></i>
                <span className="count bg-success"></span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="assets/images/faces/face4.jpg"
                      alt="image"
                      className="rounded-circle profile-pic"
                    />
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Mark send you a message
                    </p>
                    <p className="text-muted mb-0"> 1 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="../static_1/assets/images/faces/face2.jpg"
                      alt="image"
                      className="rounded-circle profile-pic"
                    />
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Cregh send you a message
                    </p>
                    <p className="text-muted mb-0"> 15 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="assets/images/faces/face3.jpg"
                      alt="image"
                      className="rounded-circle profile-pic"
                    />
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Profile picture updated
                    </p>
                    <p className="text-muted mb-0"> 18 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">4 new messages</p>
              </div>
            </li> */}
            {/* <li className="nav-item dropdown border-left">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <i className="mdi mdi-bell"></i>  
                <span className="count bg-danger"></span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Event today</p>
                    <p className="text-muted ellipsis mb-0">
                      {" "}
                      Just a reminder that you have an event today{" "}
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                    <p className="text-muted ellipsis mb-0">
                      {" "}
                      Update dashboard{" "}
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-link-variant text-warning"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Launch Admin</p>
                    <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">See all notifications</p>
              </div>
            </li> */}
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
                <h6 className="p-3 mb-0">Profile</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                  </div>
                </a>
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
                <p className="p-3 mb-0 text-center">Advanced settings</p>
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
    // <div>
    //   <header>
    //     <nav className="fixed-top">
    //       <div className="container-fluid">
    //         <div className="row">
    //           <div className="top-bar">
    //             <div className="col-lg-8 col-md-8 col-sm-12 col-12">
    //               <div className="logo">
    //                 <h2>
    //                   <i className="fa fa-clock-o" aria-hidden="true"></i>Time
    //                   <span>Tracker</span>
    //                 </h2>
    //               </div>
    //             </div>
    //             <div className="col-lg-4 col-">
    //               <div className="pre-section">
    //                 <button onClick={HandleLogout} className="top-btn">
    //                   Logout
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </nav>
    //   </header>
    // </div>
  );
}

export default Navigation;
