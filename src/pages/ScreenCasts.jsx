import React, { useState, useCallback, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Panel/Header/Header";
import SideBar from "./SideBar";
import { Card } from "react-bootstrap";
import "../CSS/task.css";
import Loader from "../components/loader/loader";
import Pagination from "../components/Pagination";

function ScreenCasts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ScreenCastsPerPage = 6;
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      "https://timelogger.webstagdummy.com/timelogger/items/screenshot?fields=*.*",
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
    setData(data.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //pagination
  const indexOfLastScreen = currentPage * ScreenCastsPerPage;
  const indexOfFirstScreen = indexOfLastScreen - ScreenCastsPerPage;
  const data1 = data.slice(indexOfFirstScreen, indexOfLastScreen);
  const totalPagesNum = Math.ceil(data.length / ScreenCastsPerPage);

  return (
    <>
      <div>
        <Navigation />
        <SideBar />
        {/* <!-- Header --> */}
        <div className="container-fluid">
          {loading ? (
            <Loader />
          ) : (
            <div className="row">
              <div className="col-lg-3">
                <SideBar />
              </div>
              <div className="col-lg-9">
                <Header />
                {/* Card */}
                <Card>
                  <div className="row"></div>
                  <div className="wrapper-card">
                    {data1?.map((d, i) => (
                      <Card key={i}>
                        <Card.Body>
                          <Card.Subtitle className="mb-2 text-muted back bg-danger text-white">
                            {d.status}
                          </Card.Subtitle>
                          <div className="">
                            <img src={d.images?.data?.full_url} alt="" />
                          </div>
                          <Card.Text>keystrocks: {d.keystrocks}</Card.Text>
                          <Card.Text>Idle Time {d.idle_time}</Card.Text>
                          <Card.Text>Clicks {d.clicks}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Card>
               
                  <div>
                    <Pagination
                      pages={totalPagesNum}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default ScreenCasts;
