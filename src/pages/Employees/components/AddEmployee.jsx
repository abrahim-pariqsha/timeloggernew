import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useFetchEmployee } from "../../../hooks/Employees";

const initialData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  gender: "",
  dob: "",
  status: "",
  address: "",
  phone: "",
  role: "",
};

// eslint-disable-next-line react/prop-types
function AddEmployee({ handleHide, handleShow, show }) {
  const token = sessionStorage.getItem("token");
  // const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState(initialData);

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    console.log(employee);
  };

  const addClient = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://timelogger.webstagdummy.com/timelogger/users",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          // employee:res.res.id,
          // employee: apidata.apidata.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          password: employee.password,
          status: "active",
          role: "4",
        }),
        method: "POST",
      }
    );
    console.log(res);

    const data = await res.json();
    await fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/employee",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: employee.status,
          user: data.data.id,
          address: employee.address,
          phone: employee.phone,
          gender: employee.gender,
          dob: employee.dob,
        }),
        method: "POST",
      }
    );

    handleHide();
    setEmployee(initialData);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleShow}
        className="btn top-btn bg-gradient-primary btn-set-task w-sm-100 emp-btn"
        data-bs-toggle="modal"
        data-bs-target="#addemp"
      >
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        Add Employee
      </button>
      <Modal show={show} onHide={handleHide} centered>
        <Modal.Header closeButton onClick={() => setEmployee(initialData)}>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addClient}>
            <label>First Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="first_name"
              value={employee.first_name}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Last Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="last_name"
              value={employee.last_name}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Email</label>
            <input
              className="form-control mb-4"
              type="email"
              name="email"
              value={employee.email}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Password</label>
            <input
              className="form-control mb-4"
              type="password"
              name="password"
              value={employee.password}
              onChange={(e) => onInputChange(e)}
              required
            />
            {/* <label>Role</label>
            <input
              className="form-control mb-4"
              type="text"
              name="role"
              value={employee.role}
              onChange={(e) => onInputChange(e)}
              required
            /> */}
            <label>Gender</label>
            <select
              className="form-control mb-4"
              name="gender"
              value={employee.gender}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label>DOB</label>
            <input
              className="form-control mb-4"
              type="date"
              name="dob"
              value={employee.dob}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Address</label>
            <input
              className="form-control mb-4"
              type="text"
              name="address"
              value={employee.address}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Phone</label>
            <input
              className="form-control mb-4"
              type="text"
              name="phone"
              value={employee.phone}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Status</label>
            <select
              className="form-control mb-4"
              name="status"
              value={employee.status}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">Select Status</option>
              <option value="published">published</option>
              <option value="draft">Draft</option>
              <option value="deleted">Deleted</option>
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
export default AddEmployee;
