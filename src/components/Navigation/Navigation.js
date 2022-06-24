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
    <div>
      <header>
        <nav className="fixed-top">
          <div className="container-fluid">
            <div className="row">
              <div className="top-bar">
                <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                  <div className="logo">
                    <h2>
                      <i className="fa fa-clock-o" aria-hidden="true"></i>Time
                      <span>Tracker</span>
                    </h2>
                  </div>
                </div>
                <div className="col-lg-4 col-">
                  <div className="pre-section">
                    <button onClick={HandleLogout} className="top-btn">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Navigation;
