import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../../../components/loader/loader";
import MaterialTable from "material-table";
import Navigation from "../../../components/Navigation/Navigation";
import SideBar from "../../SideBar";
import AddProject from "./AddProject";
// import json from "formidable/src/plugins/json";
function DetailsProject() {
  const [user, setUser] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    Client: "",
    status: "",
  });
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState("");

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const res = await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/project/${id}?fields=*.*`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    setLoading(false);
    const data = await res.json();
    setUser(data.data);
    console.log();
  };
  const columns = [
    // { title: "Client id", field: "id" },
    { title: "NAME", field: "name" },
    { title: "DESCRIPTION", field: "description" },
    { title: "START DATE", field: "start_date" },
    { title: "END DATE", field: "end_date" },
    { title: "STATUS", field: "status" },
  ];

  return (
    <>
      <Navigation />
      <SideBar />
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-2"></div>

            <div className="col-10">
              <div className="head-section border-0 mb-4">
                <div className="row align-items-center">
                  <div className="col-md-6"></div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="side-body">
                    <MaterialTable
                      title={id}
                      columns={columns}
                      style={{
                        marginLeft: "-3%",
                        // padding: "2% 2% 2% 2%",
                        backgroundColor: "#f3f3f3",
                        marginTop:"8%",
                        boxShadow: "0 0 2px 2px black",
                      }}
                      data={[
                        {
                          name: user.name,
                          description: user.description,
                          start_date: user.start_date,
                          end_date: user.end_date,
                          status: user.status,
                        },
                      ]}
                      // data={
                      // user?.map(
                      //     ({

                      //       id,
                      //       name,
                      //       description,
                      //       start_date,
                      //       end_date,
                      //       status,
                      //     }) => ({

                      //       id,
                      //       name,
                      //       description,
                      //       start_date,
                      //       end_date,

                      //       status,
                      //     })
                      //   )
                      // }
                      localization={{
                        pagination: {
                          labelRowsPerPage: false,
                        },
                      }}
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
    // <div className="">
    //   <Link className="btn btn-primary" to="/projects">
    //     Back
    //   </Link>
    //   <h1 className="display-4 ">User Id: {id}</h1>
    //   <Table striped bordered hover variant="dark">
    //     <thead>
    //       <tr>
    //         <th>Project Name</th>
    //         <th>Description</th>
    //         <th>Start Date</th>
    //         <th>End Date</th>
    //         <th>Client</th>
    //         <th>Status</th>
    //         {/* <th>Modified on</th> */}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>{user.name}</td>
    //         <td>{user.description}</td>
    //         <td>{user.start_date}</td>
    //         <td>{user.end_date}</td>
    //         <td>{user.id}</td>
    //         <td>{user.status}</td>
    //         {/* <td>{user?.project?.modified_on}</td> */}
    //       </tr>
    //     </tbody>
    //   </Table>
    // </div>
  );
}

export default DetailsProject;
