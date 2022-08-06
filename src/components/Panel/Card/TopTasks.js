import moment from "moment";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
function TopTasks() {
  const [task, setTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/totalcount")
      const data = await response.json()
      setTask(data)
    }
    fetchData()
  }, [])
  return (
    <div>
      <div className="card" id="card1">
        <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
          <h1 className="m-0 fw-bold" style={{color:"#58378a"}}>Top Tasks</h1>
        </div>
        <hr></hr>
        <div className="card-body">
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
            {/* <div className="site-list w-30">{task.toptask?.[0].name}</div> */}
            <div className="site-time">
              <span className="bg-lightblue  py-1 d-inline rounded">
                Task Name:
              </span>
              <span className="fw-bold ms-1">{task.toptask?.[0].name}</span>
            </div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Task Time:
              </span>
              <span className="fw-bold ms-1">{moment(task.toptask?.[0].totalTime).format("HH:MM:SS")}</span>
            </div>
          </div>

          {/* <!-- 2n div --> */}
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
          <div className="site-time">
              <span className="bg-lightblue  py-1 d-inline rounded">
                Task Name:
              </span>
              <span className="fw-bold ms-1">{task.toptask?.[1].name}</span>
            </div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Task Time:
              </span>
              <span className="fw-bold ms-1">{moment(task.toptask?.[1].totalTime).format("HH:MM:SS")}</span>
            </div>
          </div>

          {/* <!-- 3rd div --> */}
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
          <div className="site-time">
              <span className="bg-lightblue  py-1 d-inline rounded">
                Task Name:
              </span>
              <span className="fw-bold ms-1">{task.toptask?.[2].name}</span>
            </div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Task Time:
              </span>
              <span className="fw-bold ms-1">{moment(task.toptask?.[2].totalTime).format("HH:MM:SS")}</span>
            </div>
          </div>
          {/* <!-- 4th div --> */}
          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
          <div className="site-time">
              <span className="bg-lightblue  py-1 d-inline rounded">
                Task Name:
              </span>
              <span className="fw-bold ms-1">{task.toptask?.[3].name}</span>
            </div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Task Time:
              </span>
              <span className="fw-bold ms-1">{moment(task.toptask?.[3].totalTime).format("HH:MM:SS")}</span>
            </div>
          </div>

          <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
          <div className="site-time">
              <span className="bg-lightblue  py-1 d-inline rounded">
                Task Name:
              </span>
              <span className="fw-bold ms-1">{task.toptask?.[4].name}</span>
            </div>

            <div className="site-time">
              <span className="bg-lightblue px-3 py-1 d-inline rounded">
                Task Time:
              </span>
              <span className="fw-bold ms-1">{moment(task.toptask?.[4].totalTime).format("HH:MM:SS")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopTasks;
