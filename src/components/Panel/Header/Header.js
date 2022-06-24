import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="dashboard-section">
              <ul className="nav ">
                <li>
                  <Link className="nav-link avtive" to="">
                    {" "}
                    Today
                  </Link>
                </li>
                <li>
                  <Link className="nav-link avtive" to="">
                    {" "}
                    Yesterday
                  </Link>
                </li>
                <li>
                  <Link className="nav-link avtive" to="">
                    {" "}
                    Past 7 days
                  </Link>
                </li>
                <li>
                  <Link className="nav-link avtive" to="">
                    {" "}
                    Past 30 days
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 ">
            <div className="input-group">
              <input type="date" className="date-field" />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="input-group">
              <select className="date-fields">
                <option selected disabled>
                  {" "}
                  Select User{" "}
                </option>
                <option value="1">Grace</option>
                <option value="2">Grabielle</option>
                <option value="3">Molly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
