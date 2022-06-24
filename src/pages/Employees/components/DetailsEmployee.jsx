import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../../../components/loader/loader";
import MaterialTable from "material-table";
import Navigation from "../../../components/Navigation/Navigation";
import SideBar from "../../SideBar";
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
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true)
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
    setLoading(false)
    const data = await res.json();
    console.log("dataaaa",data)
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
  ]
  return (
    <>
   <Navigation />
    <SideBar />
    <div className="container-fluid"> 
    {loading ? (
      <Loader />
    ) : (
      <div className="row">
        <div className="col-md-3"></div>

        <div className="col-lg-9">
          <div className="head-section border-0 mb-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="card-header py-4 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap"></div>
              </div>
             
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="side-body">
        <MaterialTable
                  title={id}
                  columns={columns}
                  data = {[
                    {first_name: user?.user?.first_name,last_name: user?.user?.last_name, email: user?.user?.email,gender: user.gender,phone: user.phone,dob: user.dob,address: user.address,status: user.status},
                    
                   
                   
                  ]}
                  
                  localization={{
                    pagination: {
                      labelRowsPerPage: false,
                    },
                  }}
                 
                  options={{
                    search: true,
                    sorting:true,
                    headerStyle: { background: "#999", color: "#fff" },
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