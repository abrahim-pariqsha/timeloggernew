import React from "react";
import { Link } from "react-router-dom";
function TimeLine() {
  return (
    <div>
      <div className="card-body">
        <div className="timeline-heading d-flex align-items-center bg-transparent border-bottom-0 flex-wrap">
          <h6 className="fw-bold">Timeline</h6>
          <div className="timeinfo-block d-flex flex-wrap ms-auto">
            <div className="report ms-3">
              <Link to="" className="text-secondary underline">
                Timeline Report
              </Link>
            </div>
          </div>
        </div>
        <div
          className="progress mt-4"
          //  style="height: 8px;"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar progress-bar-striped bg-danger"
            role="progressbar"
            // style="width:100%"
            style={{ width: "100%" }}
            area-valuenow="30"
            area-valuemin="0"
            area-valuemax="100"
          ></div>
        </div>
        {/* <!-- <div className="card-body">
                    <div id="apex-timeline" style="margin-left: -25px; min-height-135px">
                        <div id="apexchartskzhmns" className="apexcharts-canvas apexchartskzhmns apexcharts-theame-light" style="width:1166px height:120px">

                        </div>
                    </div>
                </div> --> */}
        <div className="timeinfo-block d-flex flex-wrap justify-content-end">
          <div className="start-time text-muted">
            <i className="fa fa-play" aria-hidden="true"></i>
            <span>Start-time 9:55 AM</span>
          </div>

          <div className="End-time ms-3 text-muted">
            <i className="fa fa-stop-circle" aria-hidden="true"></i>
            <span>End-time 12:03 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
