import moment from "moment";
import React, { useState, useEffect } from "react";

import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
function TopTasks() {
  const [task, setTask] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const ScreenCastsPerPage = 6;

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/totalcount");
      const data = await response.json();
      setTask(data);
    };
    fetchData();
  }, []);
  //pagination
  // const indexOfLastScreen = currentPage * ScreenCastsPerPage;
  // const indexOfFirstScreen = indexOfLastScreen - ScreenCastsPerPage;
  // const data1 = task.slice(indexOfFirstScreen, indexOfLastScreen);
  // const totalPagesNum = Math?.ceil(data1?.length / ScreenCastsPerPage);
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
        <h1 className="m-0 fw-bold" id="top">
          Top Tasks
        </h1>
      </div>
      <hr></hr>
      <div className="card-body">
        {task.toptask?.map((each, idx) => (
          <div key={idx}>
            <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
              <div className="site-time">
                <span className="bg-lightblue  py-1 d-inline rounded">
                  Task Name:
                </span>
                <span className="fw-bold ms-1">{each.name}</span>
              </div>
              <div className="site-time">
                <span className="bg-lightblue px-3 py-1 d-inline rounded">
                  Task Time:
                </span>
                <span className="fw-bold ms-1">
                  {moment(each.totalTime).format("HH:MM:SS")}
                </span>
              </div>
            </div>
          </div>
        ))}
        {/* <div>
                    <Pagination
                      pages={totalPagesNum}
                      setCurrentPage={setCurrentPage}
                    />
                  </div> */}
      </div>
    </div>
  );
}

export default TopTasks;
