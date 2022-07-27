import React, { useState, useCallback, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import SideBar from "./SideBar";
import { Card } from "react-bootstrap";
import "../CSS/task.css";
import Loader from "../components/loader/loader";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
function Sessions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ScreenCastsPerPage = 6;
  const token = sessionStorage.getItem("token");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      // "https://timelogger.webstagdummy.com/timelogger/items/screenshot?fields=*.*",
      " http://timelogger.webstagdummy.com/timelogger/items/session?fields=*.*",
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
    console.log("session", data);
    setData(data.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //pagination
  // const indexOfLastScreen = currentPage * ScreenCastsPerPage;
  // const indexOfFirstScreen = indexOfLastScreen - ScreenCastsPerPage;
  // const data1 = data?.slice(indexOfFirstScreen, indexOfLastScreen);
  // const totalPagesNum = Math?.ceil(data?.length / ScreenCastsPerPage);

  const columns = [
    { title: "ID", field: "id" },
    // { title: "NAME", field: "name" },
  ];
  return (
    <>
      <Navigation />
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-2" style={{padding:"0px"}}>

      <SideBar />
            </div>

            <div className="col-10">
              <div className="head-section border-0 mb-4">
                <div className="row align-items-center">
                  {/* <div className="col-md-6">
                  <div className="card-header py-4 bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap"></div>
                </div> */}
                  <div className="col-md-11 m-5">
                    <div className="col-auto d-flex flex-row-reverse w-sm-100 mt-2 mt-sm-0"></div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="side-body">
                    <MaterialTable
                      title="Task List"
                      columns={columns}
                      style={{
                        marginLeft: "-3%",
                        // padding: "2% 2% 2% 2%",
                        backgroundColor: "#f3f3f3",
                        boxShadow: "0 0 1px 1px black",
                      }}
                      data={data?.map(
                        ({
                          id,

                          status,
                        }) => ({
                          id,

                          // assigned_employee: fetchEmployeeName(assigned_employee?.id),
                        })
                      )}
                      localization={{
                        pagination: {
                          labelRowsPerPage: false,
                        },
                        header: {
                          actions: "ACTIONS",
                        },
                      }}
                      actions={[
                        (rowData) => ({
                          icon: () => (
                            <Link
                              to={`/sessionscreenshots/${rowData?.id}`}
                              className="fa-solid fa-eye"
                            />
                          ),
                          tooltip: "view",
                          // onClick: (rowData)
                        }),
                      ]}
                      //  style={{
                      //   maxWidth: "2200px",
                      //   margin: "20px",
                      //   marginRight: "100%",
                      //   border: "8px",
                      //   textAlign: "center",
                      // }}
                      options={{
                        search: true,
                        sorting: true,
                        headerStyle: {
                          background: "#cd0c62",
                          color: "#fff",
                          fontSize: "100%",
                          fontWeight: "bold",
                        },
                        actionsColumnIndex: -1,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
    // <>
    //   <div>
    //     <Navigation />
    //     <SideBar />
    //     {/* <!-- Header --> */}
    //     <div className="container-fluid">
    //       {loading ? (
    //         <Loader />
    //       ) : (
    //         <div className="row">
    //           <div className="col-lg-3">
    //             <SideBar />
    //           </div>
    //           <div className="col-lg-9">
    //             <Header />
    //             {/* Card */}
    //             <Card>
    //               <div className="row"></div>
    //               <div className="wrapper-card">
    //                 {data1?.map((d, i) => (
    //                   <Card key={i}>
    //                     <Card.Body>
    //                       <Card.Subtitle className="mb-2 text-muted back bg-danger text-white">
    //                         {d.status}
    //                       </Card.Subtitle>
    //                       <div className="">
    //                       <Link to={`/sessionscreenshots/${d?.session.id}`}>

    //                         <img src={d.images?.data?.full_url} alt="" />

    //                         </Link>

    //                       </div>

    //                       {/* <Card.Text>keystrocks: {d.keystrocks}</Card.Text>
    //                       <Card.Text>Idle Time {d.idle_time}</Card.Text>
    //                       <Card.Text>Clicks {d.clicks}</Card.Text> */}
    //                       <Card.Text>session id {d?.session.id}</Card.Text>
    //                     </Card.Body>
    //                   </Card>
    //                 ))}
    //               </div>
    //             </Card>

    //               <div>
    //                 <Pagination
    //                   pages={totalPagesNum}
    //                   setCurrentPage={setCurrentPage}
    //                 />
    //               </div>

    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </>
  );
}
export default Sessions;
