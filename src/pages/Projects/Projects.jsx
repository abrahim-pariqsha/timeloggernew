import React, { useCallback, useState, useEffect } from "react";
import MaterialTable from "material-table";
import SideBar from "../SideBar";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import Loader from "../../components/loader/loader";
import moment from "moment";
import { useFetchClient } from "../../hooks/Clients";
import Navigation from "../../components/Navigation/Navigation";
import { Link } from "react-router-dom";
// import tableIcons from '../../service';
const Projects = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const token = sessionStorage.getItem("token");

  const fetchData = useCallback(async () => {
    const res = await fetch(
      "https://timelogger.webstagdummy.com/timelogger/items/project",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    setLoading(false);

    const data = await res.json();


    setData(data.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleUp = () => {
    setEdit(true);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleEdit = () => {
    setEdit(false);
    fetchData();
  };

  const deleteProject = async (id) => {
    if (window.confirm("Want to delete?"))
      await fetch(
        `http://timelogger.webstagdummy.com/timelogger/items/project/${id}?fields=*.*`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        }
      );
    fetchData();
  };

  const fetchUser = useCallback(async () => {
    // setLoading(true);
    const res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/users",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    // setLoading(false);
    const data1 = await res.json();
    setUsers(data1.data);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchClient = useCallback(async () => {
    // setLoading(true);
    const res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/client?fields=*.*",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );

    // setLoading(false);
    const data3 = await res.json();
   
    setClients(data3.data);
  }, []);

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchUserName = (clientname) => {
  
    const username = clients?.find((item, id) => item?.id === clientname);
    return username?.user?.first_name;
  };

  // console.log("name",fetchUserName(110))

  const columns = [
    { title: " ID", field: "id" },
    { title: "NAME", field: "name" },
    {
      title: " DESCRIPTION",
      field: "description",
    },
    {
      title: "START DATE",
      field: "start_date",
    },
    {
      title: "END DATE",
      field: "end_date",
    },
    {
      title: "CLIENT",
      field: "clients",
    },
    {
      title: "STATUS",
      field: "status",
    },
  ];
  return (
    //   <>
    //   <Navigation />
    //   <SideBar />
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-md-3"></div>

    //       <div className="col-lg-9">
    //         <div className="head-section border-0 mb-4">
    //           <div className="row align-items-center">
    //             <div className="col-md-6">
    //               <div className="card-header py-4 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
    //                 <h3 className="h4 mb-0">Project List</h3>
    //               </div>
    //             </div>
    //             <div className="col-md-6">
    //               <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
    //                 <AddProject fetchData={fetchData} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="row">
    //           <div className="col-md-12">
    //             <div className="side-body">
    //               <table
    //                 id="myProjectTable"
    //                 className="table table-hover align-middle mb-0 nowwrap dataTable no-footer dtr-inline"
    //                 style={{ width: "1005", alignItem: "center" }}
    //                 role="grid"
    //                 aria-describedby="myProjectTable_info"
    //               >
    //                 <thead>
    //                   <tr role="row">
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       Project Id
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       Project Name
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       Description
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       Start Date
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       End Date
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       Client
    //                     </th>

    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       status
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="Employee Name: activate to sort column ascending"
    //                     >
    //                       Action
    //                     </th>
    //                   </tr>
    //                 </thead>
    //                 {data &&
    //                   data.map((d, i) => (
    //                     <tbody key={i}>
    //                       <tr role="row" className="odd">
    //                         <td tabIndex="0" className="sorting_1">
    //                           <span className="fw-bold ms-1">{d.id}</span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">{d.name}</span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                             {d.description}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                             {d.start_date}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">{d.end_date}</span>
    //                         </td>

    //                         {/* { clients.map((d, i) => ( */}
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                           {fetchUserName(d?.client)}
    //                           {/* {d?.client} */}
    //                           </span>
    //                         </td>
    //                         {/* )} */}
    //                         <td>
    //                           <span className="back bg-success">
    //                             {d.status}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <Link
    //                             to={`/DetailsProject/${d.id}`}
    //                             className="btn btn-danger"
    //                           >
    //                             View
    //                           </Link>
    //                         </td>
    //                         <td className="dt-body-right">
    //                           <button
    //                             className="btn btn-primary"
    //                             type="submit"
    //                             onClick={() => deleteProject(d.id)}
    //                             role="group"
    //                             aria-label="basic outlined example"
    //                           >
    //                             Delete
    //                           </button>
    //                         </td>
    //                         <td>
    //                           <EditProject data={d} fetchData={fetchData} />
    //                         </td>
    //                       </tr>
    //                     </tbody>
    //                   ))}
    //               </table>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
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

            <div className="col" style={{marginTop:"8%"}}>
              <div className="head-section border-0 mb-4">
                <div className="row align-items-center">
                  {/* <div className="col-md-6">
                    <div className="card-header py-4 bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap"></div>
                  </div> */}
                  <div className="col">
                    <div className="col-auto d-flex flex-row-reverse w-sm-100 mt-2 mt-sm-0">
                      <AddProject fetchData={fetchData}
                      handleShow={handleShow} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="side-body">
                    <MaterialTable
                    
                      title="Project List"
                      columns={columns}
                      style={{
                        marginLeft: "-2%",
                        padding: "4% 4% 4% 4%",
                        backgroundColor: "#f3f3f3",
                        boxShadow: "0 0 1px 1px black",
                      }}
                      data={
                        data &&
                        data?.map(
                          ({
                            id,
                            name,
                            description,
                            start_date,
                            end_date,
                            client,
                            status,
                          }) => ({
                            id,

                            name,
                            description,
                            start_date,
                            end_date,
                            clients: fetchUserName(client),
                            status,
                          })
                        )
                      }
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
                            <Link id="view"
                              to={`/DetailsProject/${rowData.id}`}
                              className="fa-solid fa-eye"
                            />
                          ),
                          tooltip: "view",
                          // onClick: (rowData)
                        }),
                        (rowData) => ({
                          icon: () => (
                            <i id="trash"
                              className="fa-solid fa-trash"
                              onClick={() => deleteProject(rowData.id)}
                              title="delete"
                            ></i>
                          ),
                        }),

                        (rowData) => ({
                          icon: () => (
                            <span id="edit">
                              <EditProject
                                data={rowData}
                                handleUp={handleUp}
                                handleEdit={handleEdit}
                                edit={edit}
                                fetchData={fetchData}
                              />
                            </span>
                          ),
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
  );
};

export default Projects;
