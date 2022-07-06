import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../../../components/loader/loader";
import SideBar from "../../SideBar";
import MaterialTable from "material-table";
import Navigation from "../../../components/Navigation/Navigation";
function TaskDetails() {
  const [task, setTask] = useState({
    name: "",
    description: " ",
    project_name: " ",
    employee: "",
    status: "",
  });
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const res = await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/task/${id}?fields=*.*`,
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
    console.log("dataaa", data);
    setTask(data.data);
  };

  const columns = [
    // { title: "Client id", field: "id" },
    { title: "NAME", field: "name" },
    { title: "DESCRIPTION", field: "description" },
    { title: "PROJECT NAME", field: "project" },

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
                        padding: "2% 2% 2% 2%",
                        backgroundColor: "#f3f3f3",
                        boxShadow: "0 0 1px 1px black",
                      }}
                      data={[
                        {
                          name: task.name,
                          description: task.description,
                          status: task.status,
                          project: task?.project?.name,
                        },
                        //  {name: task.name,description: task.description,project:task.projtec,status: task.status},
                      ]}
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
    //   <Link className="btn btn-primary" to="/Task">
    //     Back
    //   </Link>
    //   <h1 className="display-4 ">User Id: {id}</h1>
    //   <Table striped bordered hover variant="dark">
    //     <thead>
    //       <tr>
    //         <th>Task Name</th>
    //         <th>Description</th>
    //         <th>Project Name</th>
    //         <th>Employee</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>{task.name}</td>
    //         <td>{task.description}</td>
    //         <td>{task.project_name?.name}</td>
    //         <td>{task.address}</td>
    //         <td>{task.status}</td>
    //       </tr>
    //     </tbody>
    //   </Table>
    // </div>
  );
}

export default TaskDetails;
