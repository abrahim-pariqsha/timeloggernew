import React from "react";
import { Link } from "react-router-dom";
function RecentScreencaste() {
  return (
    <div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
          <h6 className="m-0 fw-bold">Recent Screencasts</h6>
          <div className="report ms-3">
            <Link to="" className="text-secindary underline">
              All Screencasts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentScreencaste;
