import React from "react";

function MobileTime() {
  return (
    <div>
      <div className="card-body">
        <span className="text-muted">Mobile time</span>
        <div>
          <span className="fs-6 fw-bold me-2">0M</span>
        </div>

        <div
          className="progress mt-4"
          // style="height: 8px;"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar progress-bar-striped bg-warning"
            role="progressbar"
            // style="width:0%"
            style={{ width: "0%" }}
            area-valuenow="30"
            area-valuemin="0"
            area-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MobileTime;
