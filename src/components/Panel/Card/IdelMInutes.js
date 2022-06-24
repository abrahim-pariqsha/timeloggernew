import React from "react";

function IdelMInutes() {
  return (
    <div>
      <div className="card-body">
        <span className="text-muted">Idle minutes</span>
        <div>
          <span className="fs-6 fw-bold me-2">8M</span>
        </div>

        <div
          className="progress mt-4"
          // style="height: 8px;"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar progress-bar-striped"
            role="progressbar"
            style={{ width: "35%" }}
            // style="width:35%"
            area-valuenow="30"
            area-valuemin="0"
            area-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default IdelMInutes;
