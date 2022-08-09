import React, { useCallback, useState, useEffect } from "react";
import MaterialTable from "material-table";
import SideBar from "../SideBar";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import Loader from "../../components/loader/loader";
import swal from 'sweetalert';
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
      } else {
        swal("Your data is safe!");
      }
    });
      
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
                        backgroundColor: "#f3f3f3",
                        boxShadow: "0 0 2px 2px black",
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
