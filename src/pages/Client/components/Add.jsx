import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { token } from "../../../Constants/Contansts";

function Add({ handleAdd, clientAdd, show }) {
  const initialData = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    dob: "",
    status: "",
    address: "",
    phone: "",
  };
  // const [show, setShow] = useState(false);
  const [client, setClient] = useState({ initialData });
  const { first_name, last_name, email, company, address, phone, status } =
    client;
  const onInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const addClient = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/users",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          first_name: client.first_name,
          last_name: client.last_name,
          email: client.email,

          company: client.company,
          status: "active",
        }),
        method: "POST",
      }
    );
    const data = await res.json();
    await fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/client?fields=*.*",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: "published",
          phone: client.phone,
          user: data.data.id,
          address: client.address,
        }),
        method: "POST",
      }
    );
    clientAdd();
    setClient(initialData);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        className="btn top-btn bg-gradient-primary btn-set-task w-sm-100 emp-btn"
        data-bs-toggle="modal"
        data-bs-target="#addemp"
      >
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        Add Clients
      </button>

      <Modal show={show} onHide={clientAdd} centered>
        <Modal.Header closeButton onClick={() => setClient(initialData)}>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addClient}>
            <label>First Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="first_name"
              value={first_name}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Last Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="last_name"
              value={last_name}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Email</label>
            <input
              className="form-control mb-4"
              type="email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Company Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="company"
              value={company}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Address</label>
            <input
              className="form-control mb-4"
              type="text"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Phone</label>
            <input
              className="form-control mb-4"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Status</label>
            <select
              className="form-control mb-4"
              name="status"
              value={status}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">Select Status</option>
              <option value="published">published</option>
              <option value="action">Action</option>
              <option value="draft">Draft</option>
            </select>

            <button
              style={{ textAlign: "right" }}
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Add;
