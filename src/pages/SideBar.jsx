import { red } from "@material-ui/core/colors";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
function SideBar() {
  const Location = useLocation();
  // const { pathname } = Location;
  // const splitLocation = pathname.split("/");
  return (
    <>
    <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{zIndex:"99"}}>
    <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
      {/* <a className="sidebar-brand brand-logo" href="index.html"><img src="assets/images/logo.svg" alt="logo" /></a>
      <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a> */}
      <h1>Time Tracker</h1>
    </div>
    <ul className="nav">
      <li className="nav-item menu-items">
        <Link to ="/" className="nav-link">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">Dashboard</span>
        </Link>
      </li>
      <li className="nav-item menu-items">
        <Link to="/sessions" className="nav-link">  
          <span className="menu-icon">
            <i className="mdi mdi-playlist-play"></i>
          </span>
          <span className="menu-title">Session</span>
        </Link>
      </li>
      <li className="nav-item menu-items">
        <Link to="/employee" className="nav-link">
          <span className="menu-icon">
            <i className="mdi mdi-playlist-play"></i>
          </span>
          <span className="menu-title">Employee</span>
        </Link>
      </li>
      <li className="nav-item menu-items">
        <Link to="/client" className="nav-link">
          <span className="menu-icon">
            <i className="mdi mdi-table-large"></i>
          </span>
          <span className="menu-title">Clients</span>
        </Link>
      </li>
      <li className="nav-item menu-items">
        <Link to="/projects" className="nav-link">
          <span className="menu-icon">
            <i className="mdi mdi-chart-bar"></i>
          </span>
          <span className="menu-title">Project</span>
        </Link>
      </li>
      <li className="nav-item menu-items">
        <Link to="/task" className="nav-link" >
          <span className="menu-icon">
            <i className="mdi mdi-contacts"></i>
          </span>
          <span className="menu-title">Task</span>
        </Link>
      </li>
    </ul>
  </nav>
  </>
    // <>
    //   <div className="sidebar">
    //     <div className="sidebar-brand">
    //       <h2>
    //         {" "}
    //         <span className="lab la-accusoft"></span> Time-Tracker{" "}
    //       </h2>
    //     </div>
    //     <div className="sidebar-menu">
    //       <ul className="list">
    //         <li>
    //           <Link to="/">
    //             <i className="fa fa-home" aria-hidden="true"></i>
    //             <span>Dashboard</span>
    //             <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
    //           </Link>
    //         </li>
    //         {/* <li>
    //           <Link to="">
    //             <i className="fa fa-renren" aria-hidden="true"></i>
    //             <span>Reports</span>
    //           </Link>
    //           <ul className="sub-menu collapse" id="menu-report">
    //             <li>
    //               <Link to="" className="ms-link">
    //                 Attendence
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="" className="ms-link">
    //                 Hours Tracked
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="" className="ms-link">
    //                 Timeline
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="" className="ms-link">
    //                 Employee Logs
    //               </Link>
    //             </li>
    //           </ul>
    //         </li> */}
    //         <li>
    //           <Link to="/ScreenCasts">
    //             <i className="fa fa-desktop" aria-hidden="true"></i>
    //             <span>screencasts</span>
    //           </Link>
    //         </li>
    //         {/* <li>
    //           <Link to="">
    //             <i className="fa fa-tasks" aria-hidden="true"></i>
    //             <span>Timeline</span>
    //           </Link>
    //         </li> */}
    //         {/* <li>
    //           <Link to="">
    //             <i className="fa fa-user-circle" aria-hidden="true"></i>
    //             <span>Employee logs</span>
    //           </Link>
    //         </li> */}
    //         <li>
    //           <Link to="/employee">
    //             <i className="fa fa-list-ul" aria-hidden="true"></i>
    //             <span>Employees</span>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link to="/client">
    //             <i className="fa fa-users" aria-hidden="true"></i>
    //             <span>Client page</span>
    //           </Link>
    //         </li>
    //         <li className="listing">
    //           <Link to="/projects">
    //             <i className="fa fa-file" aria-hidden="true"></i>
    //             <span>
    //               project page
    //               {/* <i className="fa fa-caret-down"></i> */}
    //             </span>
    //           </Link>
    //           {/* <!-- <ul className="nested">
    //             <li className="nesting"><a className="ms-link" to="employee.php">Employee List</a></li>
    //             <li className="nesting"><a className="ms-link" to="client.php">Client List</a></li>
    //             <li className="nesting"><a className="ms-link" to="project.php">Project List</a></li>
    //             <li className="nesting"><a className="ms-link" to="detail.php">Ticket Details</a></li>
    //         </ul> --> */}
    //         </li>

    //         <li>
    //           <Link to="/task">
    //             <i className="fa fa-clipboard" aria-hidden="true"></i>
    //             <span>task management</span>
    //           </Link>
    //         </li>
    //         {/* <li>
    //           <Link to="/projects">
    //             <i className="fa fa-pie-chart" aria-hidden="true"></i>
    //             <span>Project timesheet</span>
    //           </Link>
    //         </li> */}
    //       </ul>
    //     </div>
    //   </div>
    //   <div>\</div>
    // </>
  );
}

export default SideBar;
