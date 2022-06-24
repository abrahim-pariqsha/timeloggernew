import React from "react";

function ManualTime() {
  return (
    <div>
      <div className="card-body">
        <span className="text-muted">manual time</span>
        <div>
          <span className="fs-6 fw-bold me-2">8</span>
        </div>

        <div
          className="progress mt-4"
          // style="height: 8px;"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar progress-bar-striped bg-warning"
            role="progressbar"
            // style="width:50%"
            style={{ width: "50%" }}
            area-valuenow="30"
            area-valuemin="0"
            area-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ManualTime;
