import React, { useCallback, useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import SideBar from "../SideBar";
import { Link } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Pagination from "../../components/Pagination";
import { useFetchEmployee } from "../../hooks/Employees";
import Loader from "../../components/loader/loader";
import MaterialTable from "material-table";
import swal from 'sweetalert';
function Employee() {
  // const { employees, getEmployees,loading } = useFetchEmployee();
  // console.log("employees",employees)

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  // const [employee, setEmployee] = useState([])
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const token = sessionStorage.getItem("token");

  const fetchEmployee = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/employee?fields=*.*",
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
    console.log("all data",data)
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/users?fields=*.*",
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
    const data1 = await res.json();
    setUsers(data1.data);
    console.log(data1,"data1111");
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const deleteEmployee = async (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        const response = await fetch(
          `http://timelogger.webstagdummy.com/timelogger/items/employee/${item?.id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            method: "DELETE",
          }
        );
        fetchEmployee();
        await fetch(
          `http://timelogger.webstagdummy.com/timelogger/users/${item?.user?.id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            method: "DELETE",
          }
        );
      } else {
        swal("Your data is safe!");
      }
    });
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
    fetchEmployee();
    fetchUser();
  };

  const handleUp = () => {
    setEdit(true);
  };
  const handleEdit = () => {
    setEdit(false);
    fetchEmployee();
    fetchUser();
  };

  // const fetchUserData = (userdata) => {
  //   console.log("edata", userdata);
  //   const userdetail = users?.find((item, id) => item?.id === userdata);
  //   console.log("username",userdetail?.user?.first_name)
  //   return userdetail?.user

  // };
  // console.log("usersssss",fetchUserData(82))
  //pagination
  // const indexOfLastEmployee = currentPage * employeesPerPage;
  // const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  // const currentEmployees = employees.slice(+
  //   indexOfFirstEmployee,
  //   indexOfLastEmployee
  // );
  // const totalPagesNum = Math.ceil(employees.length / employeesPerPage);
  const columns = [
    { title: "ID", field: "id" },
    { title: "NAME", field: "first_name" },
    {
      title: " EMAIL",
      field: "email",
    },
    {
      title: "GENDER",
      field: "gender",
    },
    {
      title: "DOB",
      field: "dob",
    },
    {
      title: "ADDRESS",
      field: "address",
    },
    {
      title: "PHONE NUMBER",
      field: "phone",
    },
    {
      title: "STATUS",
      field: "status",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="container-fluid" style={{padding: "10px 10px"}}>
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-2" style={{padding:"0px"}}>
      <SideBar />

            </div>

            <div className="col" style={{ borderStyle: "solid black", marginTop:"8%" }}>
              <div className="head-section border-0 mb-4">
                <div className="row align-items-center">
                  {/* <div className="col-md-6">
                  <div className="card-header py-4 bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap"></div>
                </div> */}
                  <div className="col">
                    <div className="col-auto d-flex flex-row-reverse w-sm-100 mt-10 mt-sm-0 ">
                      <AddEmployee
                        handleShow={handleShow}
                        handleHide={handleHide}
                        show={show}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <MaterialTable
                title="Employee List"
                style={{
                  // marginLeft: "-3%",
                  // padding: "2% 2% 2% 2%",
                  backgroundColor: "#f3f3f3",
                  boxShadow: "0 0 2px 2px black",
                }}
                columns={columns}
                data={data?.map(
                  ({
                    id,
                    user,
                    email,
                    address,
                    gender,
                    dob,
                    phone,
                    status,
                  }) => ({
                    id,
                    userId:id,
                    first_name: user?.first_name,
                    // last_name:(user?.last_name),
                    email: user?.email,
                    address,
                    dob,
                    gender,
                    phone,
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
                        to={`/DetailsEmployee/${rowData?.id}`}
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
                        onClick={() => deleteEmployee(rowData)}
                        title="delete"
                      ></i>
                    ),
                  }),

                  (rowData) => ({
                    icon: () => (
                      <span id="edit">
                        <EditEmployee
                          data={rowData}
                          handleUp={handleUp}
                          handleEdit={handleEdit}
                          edit={edit}
                          // fetchEmployee = {fetchEmployee}
                        />
                      </span>
                    ),
                  }),
                ]}
                //  style={{
                //   maxWidth: "20px",
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
    //   {loading ? (
    //       <Loader />
    //     ) : (
    //     <div className="row">
    //       <div className="col-md-3"></div>
    //       {/* <!-- sidebar-end --> */}
    //       <div className="col-lg-9">
    //         {/* <!-- header --> */}
    //         <div className="head-section border-0 mb-4">
    //           <div className="row align-items-center">
    //             <div className="col-md-6">
    //               <div className="card-header py-4 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
    //                 <h3 className="h4 mb-0">Employee List</h3>
    //               </div>
    //             </div>
    //             <div className="col-md-6">
    //               <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
    //                 <AddEmployee
    //                   handleShow={handleShow}
    //                   handleHide={handleHide}
    //                   show={show}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         {/* <!-- header end --> */}
    //         <div className="col-md-12">
    //           <div className="side-body">
    //             <table
    //               id="myProjectTable"
    //               className="table table-hover align-middle mb-0 nowwrap dataTable no-footer dtr-inline"
    //               role="grid"
    //               aria-describedby="myProjectTable_info"
    //               style={{ alignItems: "canter", width: "1005" }}
    //             >
    //               <thead>
    //                 <tr role="row">
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Employee Id
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Employee Name
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Email
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Gender
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     DOB
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Address
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Phone
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Status
    //                   </th>
    //                   <th
    //                     className="sorting_desc top-headings"
    //                     tabIndex="0"
    //                     aria-controls="myProjectTable"
    //                     rowSpan="1"
    //                     colSpan="1"
    //                     style={{ width: "221.2px" }}
    //                     aria-label="Employee Name: activate to sort column ascending"
    //                   >
    //                     Action
    //                   </th>
    //                 </tr>
    //               </thead>
    //               {currentEmployees?.flatMap((d, i) => (
    //                 <tbody key={i}>
    //                   <tr role="row" className="odd">
    //                     <td tabIndex="0" className="sorting_1">
    //                       <span className="fw-bold ms-1">{d.id}</span>
    //                     </td>
    //                     <td>
    //                       <span className="fw-bold ms-1">
    //                         {d.user?.first_name} {d.user?.last_name}
    //                       </span>
    //                     </td>
    //                     <td className="fw-bold ms-1">{d.user?.email}</td>
    //                     <td>
    //                       <span className="fw-bold ms-1">{d.gender}</span>
    //                     </td>
    //                     <td>
    //                       <span className="fw-bold ms-1">{d.dob}</span>
    //                     </td>
    //                     <td>
    //                       <span className="fw-bold ms-1">{d.address}</span>
    //                     </td>
    //                     <td>
    //                       <span className="fw-bold ms-1">{d.phone}</span>
    //                     </td>
    //                     <td>
    //                       <span className="back bg-success">{d.status}</span>
    //                     </td>
    //                     {/* <td className="dt-body-right"> */}
    //                     <td>
    //                       <Link
    //                         to={`/DetailsEmployee/${d.id}`}
    //                         className="btn btn-danger"
    //                       >
    //                         View
    //                       </Link>
    //                     </td>
    //                     <td className="dt-body-right">
    //                       <button
    //                         className="btn btn-primary"
    //                         type="submit"
    //                         onClick={() => deleteEmployee(d)}
    //                         role="group"
    //                         aria-label="basic outlined example"
    //                       >
    //                         Delete
    //                       </button>
    //                     </td>
    //                     <td>
    //                       <EditEmployee
    //                         data={d}
    //                         handleUp={handleUp}
    //                         handleEdit={handleEdit}
    //                         edit={edit}
    //                       />
    //                     </td>
    //                     {/* </td> */}
    //                   </tr>
    //                 </tbody>
    //               ))}
    //             </table>
    //           </div>
    //         </div>

    //         <div>
    //           <Pagination
    //             pages={totalPagesNum}
    //             setCurrentPage={setCurrentPage}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     )}
    //   </div>
    // </>
  );
}
export default Employee;
