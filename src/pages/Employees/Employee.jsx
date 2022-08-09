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
  

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
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
    // console.log("all data",data)
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
    // console.log(data1,"data1111");
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
                          
                        />
                      </span>
                    ),
                  }),
                ]}
               
                options={{
                  search: true,
                  sorting: true,
                  headerStyle: {
                    background: "rgba(130, 130, 130, 0.8)",
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
  );
}
export default Employee;
