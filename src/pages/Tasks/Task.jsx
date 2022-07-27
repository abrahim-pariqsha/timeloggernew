import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../SideBar";
import AddTask from "./components/AddTask";
import Navigation from "../../components/Navigation/Navigation";
import EditTask from "./components/EditTask";
import { Link } from "react-router-dom";
import { useFetchProjects } from "../../hooks/Project";
import MaterialTable from "material-table";
import Loader from "../../components/loader/loader";
import moment from "moment";
import swal from 'sweetalert';
function Client() {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const { projects, getProjects } = useFetchProjects();
  useEffect(() => {
    getProjects();
  }, []);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      "https://timelogger.webstagdummy.com/timelogger/items/task?fields=*.*",
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

  const fetchEmployee = useCallback(async () => {
    // setLoading(true)
    const res = await fetch(
      // "http://timelogger.webstagdummy.com/timelogger/users?fields=*.*",
      "http://timelogger.webstagdummy.com/timelogger/items/employee?fields=*.*",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    // setLoading(false)
    const data1 = await res.json();
    setEmployee(data1.data);
  }, []);
  useEffect(() => {
    fetchEmployee();
  }, []);
  const handleUp = () => {
    setEdit(true);
  };
  const handleEdit = () => {
    setEdit(false);
    fetchData();
  };
  //-------------------Delete--------------------------

  const deleteTask = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        await fetch(
          `http://timelogger.webstagdummy.com/timelogger/items/task/${id}?fields=*.*`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        fetchData();
        // result();
      } else {
        swal("Your data is safe!");
      }
    });
  };

  const fetchEmployeeName = (employees) => {
    console.log("emploo", employees);
    const name = employee?.find((item, id) => item.id === employees);
    return name?.user?.first_name;
  };
  const columns = [
    { title: "ID", field: "id" },
    { title: "NAME", field: "name" },

    {
      title: "DESCRIPTION",
      field: "description",
    },

    {
      title: "DUE DATE",
      field: "due_date",
    },
    {
      title: "PROJECT",
      field: "project",
    },
    {
      title: "EMPLOYEE",
      field: "assigned_employee",
    },
    {
      title: "STATUS",
      field: "status",
    },
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

            <div className="col" style={{marginTop:"8%"}}>
              <div className="head-section border-0 mb-4">
                <div className="row align-items-center">
                  {/* <div className="col-md-6">
                  <div className="card-header py-4 bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap"></div>
                </div> */}
                  <div className="col">
                    <div className="col-auto d-flex flex-row-reverse w-sm-100 mt-2 mt-sm-0">
                      <AddTask tokenProp={token} fetchData={fetchData} />
                    </div>
                  </div>
                </div>
              </div>

              <MaterialTable
                title="Task List"
                columns={columns}
                style={{
                  // marginLeft: "-3%",
                  // padding: "2% 2% 2% 2%",
                  backgroundColor: "#f3f3f3",
                  boxShadow: "0 0 2px 2px black",
                }}
                data={data?.map(
                  ({
                    id,
                    description,
                    due_date,
                    name,
                    assigned_employee,
                    project,
                    status,
                  }) => ({
                    id,

                    // first_name:(user?.first_name),
                    // email:(user?.email),
                    // company:(user?.company),
                    assigned_employee: fetchEmployeeName(assigned_employee?.id),
                    description,
                    due_date: moment(due_date).format("YYYY-MM-DD"),
                    project: project?.name,

                    name,

                    status,
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
                      <Link id="view"
                        to={`/TaskDetails/${rowData?.id}`}
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
                        onClick={() => deleteTask(rowData.id)}
                        title="delete"
                      ></i>
                    ),
                  }),

                  (rowData) => ({
                    icon: () => (
                      <span id="edit" >
                        <EditTask 
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
        )}
      </div>
    </>
    // <>
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
    //                 <h3 className="h4 mb-0">Task Management</h3>
    //               </div>
    //             </div>
    //             <div className="col-md-6">
    //               <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
    // <AddTask tokenProp={token} fetchData={fetchData} />
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
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Task Id
    //                     </th>

    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Name
    //                     </th>

    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="client Name: activate to sort column ascending"
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
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Due Date
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Project
    //                     </th>

    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Employee
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Status
    //                     </th>
    //                     <th
    //                       className="sorting_desc top-headings"
    //                       tabIndex="0"
    //                       aria-controls="myProjectTable"
    //                       rowSpan="1"
    //                       colSpan="1"
    //                       style={{ width: "221.2px" }}
    //                       aria-label="client Name: activate to sort column ascending"
    //                     >
    //                       Action
    //                     </th>
    //                   </tr>
    //                 </thead>
    //                 {data &&
    //                   data?.map((d, i) => (
    //                     <tbody key={i}>
    //                       <tr role="row" className="odd">
    //                         <td tabIndex="0" className="sorting_1">
    //                           <span className="fw-bold ms-1">{d.id}</span>
    //                         </td>
    //                         <td tabIndex="0" className="sorting_1">
    //                           <span className="fw-bold ms-1">{d.name} </span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                             {d.description}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                             {/* {d.due_date} */}
    //                             {moment(d.due_date).format("DD-MM-YYYY")}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                             {d?.project?.name}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <span className="fw-bold ms-1">
    //                             {fetchEmployeeName(d?.assigned_employee?.id)}
    //                           </span>
    //                         </td>

    //                         <td>
    //                           <span className="back bg-success">
    //                             {d.status}
    //                           </span>
    //                         </td>
    //                         <td>
    //                           <Link
    //                             to={`/TaskDetails/${d.id}`}
    //                             className="btn btn-danger"
    //                           >
    //                             View
    //                           </Link>
    //                         </td>
    //                         <td className="dt-body-right">
    //                           <button
    //                             className="btn btn-primary"
    //                             type="submit"
    //                             onClick={() => deleteTask(d.id)}
    //                             role="group"
    //                             aria-label="basic outlined example"
    //                           >
    //                             Delete
    //                           </button>
    //                         </td>
    //                         <td>
    // <EditTask
    //   data={d}
    //   handleUp={handleUp}
    //   handleEdit={handleEdit}
    //   edit={edit}
    //   fetchData={fetchData}
    // />
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
  );
}
export default Client;
