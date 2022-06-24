import React from "react";
import { Link } from "react-router-dom";
function TopTasks() {
  return (
    <div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
          <h6 className="m-0 fw-bold">Top tasks</h6>
          <div className="report ms-3">
            <Link to="#" className="text-secondary underline">
              Project report
            </Link>
          </div>
        </div>

        <div className="card-body">
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
            <div className="site-list w-30">Design index page</div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Design
              </span>
              <span className="fw-bold ms-1">2h 10m</span>
            </div>
          </div>

          {/* <!-- 2n div --> */}
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
            <div className="site-list w-30">Create blog</div>

            <div className="site-time">
              <span className="light-danger-bg px-3 py-1 d-inline rounded">
                Marketing
              </span>
              <span className="fw-bold ms-1">2h 10m</span>
            </div>
          </div>

          {/* <!-- 3rd div --> */}
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
            <div className="site-list w-30">Authenication</div>

            <div className="site-time">
              <span className="light-orange-bg px-3 py-1 d-inline rounded">
                Developement
              </span>
              <span className="fw-bold ms-1">2h 10m</span>
            </div>
          </div>
          {/* <!-- 4th div --> */}
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
            <div className="site-list w-30">Crude operation</div>

            <div className="site-time">
              <span className="light-orange-bg px-3 py-1 d-inline rounded">
                Developement
              </span>
              <span className="fw-bold ms-1">2h 10m</span>
            </div>
          </div>

          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
            <div className="site-list w-30">Create logo</div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Design
              </span>
              <span className="fw-bold ms-1">2h 10m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopTasks;
