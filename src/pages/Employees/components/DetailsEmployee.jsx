import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../../../components/loader/loader";
import MaterialTable from "material-table";
import Navigation from "../../../components/Navigation/Navigation";
import SideBar from "../../SideBar";
import { red } from "@mui/material/colors";
import { style } from "@mui/system";
function ClientDetails() {
  const [user, setUser] = useState({
    first_name: " ",
    last_name: " ",
    email: " ",
    company: " ",
    address: "",
    phone: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const res = await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/employee/${id}?fields=*.*`,
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
    console.log("dataaaa", data);
    setUser(data.data);
  };

  const columns = [
    // { title: "Client id", field: "id" },
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Email", field: "email" },
    { title: "Gender", field: "gender" },
    { title: "DOB", field: "dob" },
    { title: "Address", field: "address" },
    { title: "Phone", field: "phone" },
    { title: "Status", field: "status" },
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
                          first_name: user?.user?.first_name,
                          last_name: user?.user?.last_name,
                          email: user?.user?.email,
                          gender: user.gender,
                          phone: user.phone,
                          dob: user.dob,
                          address: user.address,
                          status: user.status,
                        },
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
  );
}
export default ClientDetails;
