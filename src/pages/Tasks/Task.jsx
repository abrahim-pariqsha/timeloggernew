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
    // console.log("emploo", employees);
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
export default Client;
