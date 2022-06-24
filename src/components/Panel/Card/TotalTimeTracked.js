import React from "react";

function TotalTimeTracked() {
  return (
    <div>
      <div className="card-body">
        <span className="text-muted">Total time tracked</span>
        <div>
          <span className="fs-6 fw-bold me-2">8h 41m</span>
        </div>
        <small className="text-muted d-block">This week: 9h 34m</small>
        <small className="text-muted d-block">This month: 97h 54m</small>
      </div>
    </div>
  );
}

export default TotalTimeTracked;
