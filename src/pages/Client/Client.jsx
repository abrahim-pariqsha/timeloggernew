import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import SideBar from "../SideBar";
import { Link } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { useFetchClient } from "../../hooks/Clients";
import { token } from "../../Constants/Contansts";
import DeleteDialog from "../../components/Modal/DeleteDialog";
import Loader from "../../components/loader/loader";
import MaterialTable from "material-table";
import swal from 'sweetalert';


const Client = () => {
  const { clients, getClients, loading } = useFetchClient();

  
  const [show, setShow] = useState(false);
  const deleteRef = useRef(null);
  const [editClient, setEditClient] = useState(false);
  // const [offSet, setOffSet] = useState(0);
  
  //   const handlePageClick = (e) => {
    //     const selectedPage = e.selected;
    //     setOffSet(selectedPage + 1)
    // };
    
    // --------Add---------
    useEffect(() => {
      getClients();
    }, []);
    console.log("getcltt",clients)
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
      })
      .then(async (willDelete) => {
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
          swal("Your imaginary file is safe!");
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
                  // marginLeft: "-3%",
                  // padding: "2% 2% 2% 2%",
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
                      <Link id="view"
                        to={`/ClientDetails/${rowData?.id}`}
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
    //                 <h3 className="h4 mb-0">Client List</h3>
    //               </div>
    //             </div>
    //             <div className="col-md-6">
    //               <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
    // <Add
    //   tokenProp={token}
    //   handleAdd={handleAdd}
    //   clientAdd={clientAdd}
    //   show={show}
    // />
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
    //                       Client Id
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
    //                       Client Name
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
    //                       Email
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
    //                       Company Name
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
    //                       Address
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
    //                       Phone
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
    //                 {clients?.map((d, i) => (
    //                   <tbody key={i}>
    //                     <tr role="row" className="odd">
    //                       <td tabIndex="0" className="sorting_1">
    //                         <span className="fw-bold ms-1">{d?.id}</span>
    //                       </td>
    //                       <td tabIndex="0" className="sorting_1">
    //                         <span className="fw-bold ms-1">
    //                           {d?.user?.first_name}
    //                           {d?.user?.last_name}{" "}
    //                         </span>
    //                       </td>
    //                       <td>
    //                         <span className="fw-bold ms-1">
    //                           {d?.user?.email}
    //                         </span>
    //                       </td>
    //                       <td>
    //                         <span className="fw-bold ms-1">
    //                           {d?.user?.company}
    //                         </span>
    //                       </td>
    //                       <td>
    //                         <span className="fw-bold ms-1">{d?.address}</span>
    //                       </td>
    //                       <td>
    //                         <span className="fw-bold ms-1">{d?.phone}</span>
    //                       </td>
    //                       <td>
    //                         <span className="back bg-success">
    //                           {d?.user?.status}
    //                         </span>
    //                       </td>
    //                       <td>
    //                         <Link
    //                           to={`/ClientDetails/${d.id}`}
    //                           className="btn btn-danger"
    //                         >
    //                           View
    //                         </Link>
    //                       </td>
    //                       <td className="dt-body-right">
    //                         <button
    //                           className="btn btn-primary"
    //                           type="submit"
    //                           onClick={() => deleteClient(d)}
    //                           // onClick={() => {
    //                           //   deleteRef?.current?.show();
    //                           //   setSelectedClient(d);
    //                           // }}
    //                           role="group"
    //                           aria-label="basic outlined example"
    //                         >
    //                           Delete
    //                         </button>
    //                       </td>
    //                       <td>
    //                         <Edit
    //                           data={d}
    //                           update={update}
    //                           handleUpdate={handleUpdate}
    //                           editClient={editClient}
    //                         />
    //                       </td>
    //                     </tr>
    //                   </tbody>
    //                 ))}
    //               </table>
    //             </div>
    //           </div>
    //         </div>
    //         {/* <div>
    //         <ReactPaginate
    //                 previousLabel={"prev"}
    //                 nextLabel={"next"}
    //                 breakLabel={"..."}
    //                 breakClassName={"break-me"}
    //                 // pageCount={pageCount}
    //                 marginPagesDisplayed={2}
    //                 pageRangeDisplayed={5}
    //                 onPageChange={handlePageClick}
    //                 containerClassName={"pagination"}
    //                 subContainerClassName={"pages pagination"}
    //                 activeClassName={"active"}/>
    //         </div> */}
    //       </div>
    //     </div>
    //   </div>
    //   {/* <DeleteDialog ref={deleteRef} handleConfirm={deleteClient} /> */}
    // </>
  );
};
export default Client;
