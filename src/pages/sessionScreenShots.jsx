import React, { useState, useCallback, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Panel/Header/Header";
import SideBar from "./SideBar";
import { Card } from "react-bootstrap";
import "../CSS/task.css";
import Loader from "../components/loader/loader";
import Pagination from "../components/Pagination";
import { Link, useParams } from "react-router-dom";
function SessionsScreenshots() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ScreenCastsPerPage = 6;
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

  useEffect(() => {
    fetchData();
  }, []);

  //pagination
  // const indexOfLastScreen = currentPage * ScreenCastsPerPage;
  // const indexOfFirstScreen = indexOfLastScreen - ScreenCastsPerPage;
  // const data1 = data.slice(indexOfFirstScreen, indexOfLastScreen);
  // const totalPagesNum = Math.ceil(data.length / ScreenCastsPerPage);

  return (
    <>
      <div>
        <Navigation />
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
                  
                    {data?.map((d, i) => (
                      <Card key={i}>
                        <Card.Body>
                          {/* <Card.Subtitle className="mb-2 text-muted back bg-danger text-white">
                            {d?.status}
                          </Card.Subtitle> */}
                          <div className="">
                          <a href={d?.images?.data?.full_url} target="_blank" rel="noopener noreferrer" >
                            <img src={d?.images?.data?.full_url} alt="" />
                            </a>
                          </div>
                          <Card.Text>keystrocks: {d?.keystrocks}</Card.Text>
                          <Card.Text>Idle Time: {d?.idle_time}</Card.Text>
                          <Card.Text>Clicks: {d?.clicks}</Card.Text>
                          <Card.Text>session id: {d?.session?.id}</Card.Text>
                          <Card.Text>
                            start_date: {d?.session?.start_date}
                          </Card.Text>
                          <Card.Text>
                            end_date: {d?.session?.end_date}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                    {/* {!data(
                      "No data Found"
                    )} */}
                  </div>
                </Card>

                {/* <div>
                    <Pagination
                      pages={totalPagesNum}
                      setCurrentPage={setCurrentPage}
                    />
                  </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default SessionsScreenshots;
