import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import SideBar from "../SideBar";
import { Link } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { useFetchClient } from "../../hooks/Clients";

import Loader from "../../components/loader/loader";
import MaterialTable from "material-table";
import swal from "sweetalert";

const Client = () => {
  const { clients, getClients, loading } = useFetchClient();

  const [show, setShow] = useState(false);
  const deleteRef = useRef(null);
  const [editClient, setEditClient] = useState(false);
 

  // --------Add---------
  useEffect(() => {
    getClients();
  }, []);
  // console.log("getcltt", clients);
  const handleAdd = () => {
    setShow(true);
  };
  const clientAdd = () => {
    setShow(false);
    getClients();
  };

  // -----------update--------
  const update = () => {
    setEditClient(true);
  };

  const handleUpdate = () => {
    setEditClient(false);
    getClients();
  };
  const token = sessionStorage.getItem("token");

  const deleteClient = async (selectedClient) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await fetch(
          `http://timelogger.webstagdummy.com/timelogger/items/client/${selectedClient?.id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            method: "DELETE",
          }
        );
        getClients();
        await fetch(
          `http://timelogger.webstagdummy.com/timelogger/users/${selectedClient?.user?.id}`,
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
    // deleteRef?.current?.hide()
  };

  const columns = [
    { title: "ID", field: "id" },
    { title: "NAME", field: "first_name" },
    {
      title: " EMAIL",
      field: "email",
    },
    {
      title: "COMPANY NAME",
      field: "company",
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
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-2" style={{ padding: "0px" }}>
              <SideBar />
            </div>

            <div className="col" style={{ marginTop: "8%" }}>
              <div className="head-section border-0 mb-4">
                <div className="row align-items-center">
              
                  <div className="col">
                    <div className="col-auto d-flex flex-row-reverse w-sm-100 mt-2 mt-sm-0">
                      <Add
                        tokenProp={token}
                        handleAdd={handleAdd}
                        clientAdd={clientAdd}
                        show={show}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <MaterialTable
                title="Client List"
                columns={columns}
                style={{
                  backgroundColor: "#f3f3f3",
                  boxShadow: "0 0 2px 2px black",
                }}
                data={clients?.map(
                  ({
                    id,
                    user,
                    email,
                    company,
                    address,
                    gender,
                    dob,
                    phone,
                    status,
                  }) => ({
                    id,
                    userId: user?.id,
                    first_name: user?.first_name,
                    email: user?.email,
                    company: user?.company,
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
                      <Link
                        id="view"
                        to={`/ClientDetails/${rowData?.id}`}
                        className="fa-solid fa-eye"
                      />
                    ),
                    tooltip: "view",
                  }),
                  (rowData) => ({
                    icon: () => (
                      <i
                        id="trash"
                        className="fa-solid fa-trash"
                        onClick={() => deleteClient(rowData)}
                        title="delete"
                      ></i>
                    ),
                  }),

                  (rowData) => ({
                    icon: () => (
                      <span id="edit">
                        <Edit
                          data={rowData}
                          update={update}
                          handleUpdate={handleUpdate}
                          editClient={editClient}
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
};
export default Client;
