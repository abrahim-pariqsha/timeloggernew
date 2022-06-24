import React from "react";

function ProductiveTime() {
  return (
    <div>
      <div className="card-body">
        <span className="text-muted">Productive time</span>
        <div>
          <span className="fs-6 fw-bold me-2">7h</span>
        </div>
        <div
          className="progress mt-4"
          // style="height: 8px;"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            // style="width:40%"
            style={{ width: "40%" }}
            area-valuenow="30"
            area-valuemin="0"
            area-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProductiveTime;
