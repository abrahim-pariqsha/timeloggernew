import React from "react";
import { Link } from "react-router-dom";
function TopProjects() {
  return (
    <div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
          <h6 className="m-0 fw-bold">Top projects</h6>
          <div className="report ms-3">
            <Link to="#" className="text-secondary underline">
              Project report
            </Link>
          </div>
        </div>

        <div className="card-body">
          <div className="row g-3 row-cols-1 row-cols-lg-3 row-cols-md-3 row-cols-sm-3">
            <div className="col">
              <div
                id="apex-circle-chart-one"
                // style="min-height: 158.7px;"
                style={{ minHeight: "158.7px" }}
              >
                <div
                  id="apexchartskryu24lh"
                  className="apexcharts-canvas apexchartskryu24lh apexchats-theme-light"
                  // style="width: 145px; height: 158.7px;"
                  style={{ width: "145px", height: "158.7px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopProjects;
