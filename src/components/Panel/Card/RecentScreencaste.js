import React,{useState,useCallback,useEffect} from "react";
import { Link, useParams } from "react-router-dom";
function RecentScreencaste() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `https://timelogger.webstagdummy.com/timelogger/items/screenshot?filter[session.id]=` +
        id +
        "&fields=*.*",
      // `http://timelogger.webstagdummy.com/timelogger/items/session?fields*.*`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    setLoading(false);
    const data = await res.json();
    console.log("sessionfff", data);
    setData(data.data)
  }, []);
  return (
    <div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
          <h6 className="m-0 fw-bold">Recent Screencasts</h6>
          <div className="report ms-3">
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentScreencaste;
