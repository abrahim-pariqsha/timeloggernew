import React from "react";
import { Link } from "react-router-dom";
function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            {" "}
            <span className="lab la-accusoft"></span> Time-Tracker{" "}
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul className="list">
            <li>
              <Link to="/">
                <i className="fa fa-home" aria-hidden="true"></i>
                <span>Dashboard</span>
                <span className="arrow icofont-rounded-down ms-auto text-end fs-5"></span>
              </Link>
            </li>
            {/* <li>
              <Link to="">
                <i className="fa fa-renren" aria-hidden="true"></i>
                <span>Reports</span>
              </Link>
              <ul className="sub-menu collapse" id="menu-report">
                <li>
                  <Link to="" className="ms-link">
                    Attendence
                  </Link>
                </li>
                <li>
                  <Link to="" className="ms-link">
                    Hours Tracked
                  </Link>
                </li>
                <li>
                  <Link to="" className="ms-link">
                    Timeline
                  </Link>
                </li>
                <li>
                  <Link to="" className="ms-link">
                    Employee Logs
                  </Link>
                </li>
              </ul>
            </li> */}
            <li>
              <Link to="/ScreenCasts">
                <i className="fa fa-desktop" aria-hidden="true"></i>
                <span>screencasts</span>
              </Link>
            </li>
            {/* <li>
              <Link to="">
                <i className="fa fa-tasks" aria-hidden="true"></i>
                <span>Timeline</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <span>Employee logs</span>
              </Link>
            </li> */}
            <li>
              <Link to="/employee">
                <i className="fa fa-list-ul" aria-hidden="true"></i>
                <span>Employees</span>
              </Link>
            </li>
            <li>
              <Link to="/client">
                <i className="fa fa-users" aria-hidden="true"></i>
                <span>Client page</span>
              </Link>
            </li>
            <li className="listing">
              <Link to="/projects">
                <i className="fa fa-file" aria-hidden="true"></i>
                <span>
                  project page
                  {/* <i className="fa fa-caret-down"></i> */}
                </span>
              </Link>
              {/* <!-- <ul className="nested">  
                <li className="nesting"><a className="ms-link" to="employee.php">Employee List</a></li>
                <li className="nesting"><a className="ms-link" to="client.php">Client List</a></li>
                <li className="nesting"><a className="ms-link" to="project.php">Project List</a></li>
                <li className="nesting"><a className="ms-link" to="detail.php">Ticket Details</a></li>
            </ul> --> */}
            </li>

            <li>
              <Link to="/task">
                <i className="fa fa-clipboard" aria-hidden="true"></i>
                <span>task management</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/projects">
                <i className="fa fa-pie-chart" aria-hidden="true"></i>
                <span>Project timesheet</span>
              </Link>
            </li> */}
           
          </ul>
        </div>
      </div>
      <div>\</div>
    </>
  );
}

export default SideBar;
