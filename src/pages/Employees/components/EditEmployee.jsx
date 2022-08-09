import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useFetchEmployee } from "../../../hooks/Employees";

// eslint-disable-next-line react/prop-types
function EditEmployee({ data, handleUp, handleEdit, edit }) {
  // const { employees, getEmployees } = useFetchEmployee();
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState();

  // console.log("data", data);

  //client
  const onEmployeeChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setEmployee(data);
  }, [data]);



  //user
  const addEmployeeUser = async (e) => {
    e.preventDefault();
    await fetch(
      `http://timelogger.webstagdummy.com/timelogger/users/${employee.userId}?fields=*.*`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          first_name: employee.first_name,

          email: employee.email,
          // status: user.status,
        }),
        method: "PATCH",
      }
    );
    // console.log("idd", employee.userId),
      //client
      await fetch(
        `http://timelogger.webstagdummy.com/timelogger/items/employee/${employee.id}?fields=*.*`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: employee.status,
            gender: employee.gender,
            dob: employee.dob,
            phone: employee.phone,
            address: employee.address,
          }),
          method: "PATCH",
        }
      );
    setShow(false);
    handleEdit();

    onEmployeeChange();
  };

  if (!employee) return <div></div>;
  const { gender, dob, address, phone, status, first_name, email } = employee;

  return (
    <div>
      <a onClick={() => setShow(true)}>
        <i className="fa-solid fa-user-pen"></i>
      </a>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addEmployeeUser}>
            <label>First Name</label>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={(e) => onEmployeeChange(e)}
              required
            />

            <label>Email</label>
            <input
              className="form-control mb-4"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onEmployeeChange(e)}
              required
            />
            <label>Gender</label>
            <select
              className="form-control mb-4"
              default="Male"
              placeholder="Gender"
              name="gender"
              value={gender}
              onChange={(e) => onEmployeeChange(e)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label>DOB</label>
            <input
              className="form-control mb-4"
              type="date"
              placeholder="dob"
              name="dob"
              value={dob}
              onChange={(e) => onEmployeeChange(e)}
              required
            />
            <label>Address</label>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => onEmployeeChange(e)}
              required
            />
            <label>Phone Number</label>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => onEmployeeChange(e)}
              required
            />
            <label>Status</label>
            <select
              className="form-control mb-4"
              type="text"
              placeholder="Status"
              name="status"
              value={status}
              onChange={(e) => onEmployeeChange(e)}
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
export default EditEmployee;
