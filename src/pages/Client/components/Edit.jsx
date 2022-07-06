import React, { useState } from "react";
import { Modal } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
function Edit({
  data,
  update,
  handleUpdate,
  editClient,
}) {
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [client, setClient] = useState(data);
  // eslint-disable-next-line react/prop-types
  // const [user, setUser] = useState({ ...userProp });

  //client
  const onClientChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  //user
  // const onUserChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  //user
  const addClientUser = async (e) => {
    e.preventDefault();
    await fetch(
      `http://timelogger.webstagdummy.com/timelogger/users/${client.userId}?fields=*.*`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          first_name: client.first_name,
          // last_name: client.last_name,
          email: client.email,
          company: client.company,
          // status: "active",
        }),
        method: "PATCH",
      }
    );
    //client
    await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/client/${client.id}?fields=*.*`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          // status: "published",
          phone: client.phone,
          address: client.address,
          status:client.status
        }),
        method: "PATCH",
      }
    );
    setShow(false);
    handleUpdate();
    onClientChange();
  };

  if (!client) return <div></div>;
  const { address, phone, status,first_name,  company, email } = client;
  
  return (
    <div>
      <a
       
        onClick={() => setShow(true)}
       
      >
        <i className="fa-solid fa-user-pen"></i>
      </a>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addClientUser}>
          <label>First Name</label>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={(e) => onClientChange(e)}
              required
            />
            
             <label>Email</label>
            <input
              className="form-control mb-4"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onClientChange(e)}
              required
            />
             <label>Company Name</label>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Company Name"
              name="company"
              value={company}
              onChange={(e) => onClientChange(e)}
              required
            />
             <label>Address</label>
             <input
              className="form-control mb-4"
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => onClientChange(e)}
              required
            />
             <label>Phone Number</label>

            <input
              className="form-control mb-4"
              type="number"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => onClientChange(e)}
              required
            />
             <label>Status </label>

            <select
              className="form-control mb-4"
              
              placeholder="Status"
              name="status"
              value={status}
              onChange={(e) => onClientChange(e)}
              required
            >
               <option value="">Select Status</option>
              <option value="published">published</option>
              <option value="action">Active</option>
              <option value="draft">Draft</option>
            </select>
            <button
              style={{ textAlign: "right" }}
              type="submit"
              className="btn btn-warning"
              onClick={() => setShow(false)}
            >
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Edit;