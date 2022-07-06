import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../../../components/loader/loader";
import MaterialTable from "material-table";
import SideBar from "../../SideBar";
import Navigation from "../../../components/Navigation/Navigation";

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
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const res = await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/client/${id}?fields=*.*`,
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
  };
  const columns = [
    // { title: "Client id", field: "id" },
    { title: "FIRST NAME", field: "first_name" },
    { title: "LAST NAME", field: "last_name" },
    { title: "EMAIL", field: "email" },
    { title: "COMPANY NAME", field: "company" },
    { title: "ADDRESS", field: "address" },
    { title: "PHONE", field: "phone" },
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
                          first_name: user?.user?.first_name,
                          last_name: user?.user?.last_name,
                          email: user?.user?.email,
                          company: user?.user?.company,
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
    // <>
    // <div className="">
    //   <Link className="btn btn-primary" to="/client">
    //     Back
    //   </Link>
    //   <h1 className="display-4 ">User Id: {id}</h1>
    //  {loading ? (
    //     <Loader />
    //   ) : (
    //   <Table striped bordered hover variant="dark">
    //     <thead>
    //       <tr>
    //         <th>First Name</th>
    //         <th>Last Name</th>
    //         <th>Email</th>
    //         <th>Company Name</th>
    //         <th>Address</th>
    //         <th>Phone</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>{user.user?.first_name}</td>
    //         <td>{user.user?.last_name}</td>
    //         <td>{user.user?.email}</td>
    //         <td>{user.user?.company}</td>
    //         <td>{user.address}</td>
    //         <td>{user.phone}</td>
    //         <td>{user.status}</td>
    //       </tr>
    //     </tbody>
    //   </Table>
    //   )}
    // </div>
    // </>
  );
}

export default ClientDetails;
