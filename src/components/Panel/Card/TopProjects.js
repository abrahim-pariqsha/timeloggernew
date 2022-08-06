import React,{useState,useEffect} from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useFetchProjects } from "../../../hooks/Project";
function TopProjects() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/totalcount")
      const data = await response.json()
      setProject(data)
    }
    fetchData()
  }, [])

  return (
    <div>
    <div className="card" id="card1">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
        <h1 className="m-0 fw-bold" style={{color:"#58378a"}}>Top Projects</h1>
      </div>
      <hr></hr>
      <div className="card-body">
        <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
          {/* <div className="site-list w-30">{project.topProjects?.[0].name}</div> */}
          <div className="site-time">
            <span className="bg-lightblue  py-1 d-inline rounded">
              Project Name:
            </span>
            <span className="fw-bold ms-1">{project.topProjects?.[0].name}</span>
          </div>

          <div className="site-time">
            <span className="bg-lightblue px-3 py-1 d-inline rounded">
              Project Time:
            </span>
            <span className="fw-bold ms-1">{moment(project.topProjects?.[0].totalTime).format("HH:MM:SS")}</span>
          </div>
        </div>

        {/* <!-- 2n div --> */}
        <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
        <div className="site-time">
            <span className="bg-lightblue  py-1 d-inline rounded">
              Project Name:
            </span>
            <span className="fw-bold ms-1">{project.topProjects?.[1].name}</span>
          </div>

          <div className="site-time">
            <span className="bg-lightblue px-3 py-1 d-inline rounded">
              Project Time:
            </span>
            <span className="fw-bold ms-1">{moment(project.topProjects?.[1].totalTime).format("HH:MM:SS")}</span>
          </div>
        </div>
        {/* {moment(d.due_date).format("DD-MM-YYYY")} */}

        {/* <!-- 3rd div --> */}
        <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
        <div className="site-time">
            <span className="bg-lightblue  py-1 d-inline rounded">
              Project Name:
            </span>
            <span className="fw-bold ms-1">{project.topProjects?.[2].name}</span>
          </div>

          <div className="site-time">
            <span className="bg-lightblue px-3 py-1 d-inline rounded">
              Project Time:
            </span>
            <span className="fw-bold ms-1">{moment(project.topProjects?.[2].totalTime).format("HH:MM:SS")}</span>
          </div>
        </div>
        {/* <!-- 4th div --> */}
        <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
        <div className="site-time">
            <span className="bg-lightblue  py-1 d-inline rounded">
              Project Name:
            </span>
            <span className="fw-bold ms-1">{project.topProjects?.[3].name}</span>
          </div>

          <div className="site-time">
            <span className="bg-lightblue px-3 py-1 d-inline rounded">
              Project Time:
            </span>
            <span className="fw-bold ms-1">{moment(project.topProjects?.[3].totalTime).format("HH:MM:SS")}</span>
          </div>
        </div>

        <div className="site-block-list d-flex align-items-center flex-wrap justify-content-sm-between mb-3">
        <div className="site-time">
            <span className="bg-lightblue  py-1 d-inline rounded">
              Project Name:
            </span>
            <span className="fw-bold ms-1">{project.topProjects?.[4].name}</span>
          </div>

          <div className="site-time">
            <span className="bg-lightblue px-3 py-1 d-inline rounded">
              Project Time:
            </span>
            <span className="fw-bold ms-1">{moment(project.topProjects?.[4].totalTime).format("HH:MM:SS")}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TopProjects;
