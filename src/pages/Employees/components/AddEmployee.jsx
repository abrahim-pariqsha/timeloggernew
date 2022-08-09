import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useFetchEmployee } from "../../../hooks/Employees";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Loader from "../../../components/loader/loader";
import createClient from "../../../Client/Client";

// eslint-disable-next-line react/prop-types
function AddEmployee({ handleHide, handleShow, show }) {
  const [loading, setLoading] = useState(false);
  const PASS = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validation = yup.object({
    email: yup.string().matches(EMAIL, "Enter a valid email").required(),
    password: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    dob: yup.date().required(),
    address: yup.string().required(),
    phone: yup.number().required(),
    status: yup.string().required(),
  });

  const onSubmit = async (values) => {
    const { email, password, first_name, last_name, status, role } = values;
    const user = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
      status: "active",
      role: "4",
    };
    setLoading(true);
    const Client = createClient(sessionStorage.getItem("token"));
    const res = await Client.post("users", user);
    if (res) {
      // console.log(res);
    }
    const { id, address, phone, gender, dob } = values;
    const employee = {
      user: res.data.data.id,
      address: address,
      phone: phone,
      gender: gender,
      dob: dob,
    };
    const response = await Client.post("items/employee", employee).catch(
      (err) => {
        if (err && err.response) {
          console.log(err);
        }
      }
    );
    if (response) {
      // console.log(response);
    }
    handleHide();
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
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
    },
    validateOnBlur: true,
    validationSchema: validation,
    onSubmit,
  });

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
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={formik.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">
              {formik.touched.first_name && formik.errors.first_name
                ? "Enter first name"
                : ""}
            </span>
            <br></br>
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={formik.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">
              {formik.touched.last_name && formik.errors.last_name
                ? "Enter Last name"
                : ""}
            </span>
            <br></br>
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formik.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </span>
            <br></br>
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formik.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            <span id="errDisplay">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </span>
            <br></br>
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              value={formik.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <span id="errDisplay">
              {formik.touched.gender && formik.errors.gender
                ? formik.errors.gender
                : ""}
            </span>
            <br></br>
            <label>DOB</label>
            <input
              className="form-control"
              type="date"
              name="dob"
              value={formik.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            <span id="errDisplay">
              {formik.touched.dob && formik.errors.dob ? formik.errors.dob : ""}
            </span>
            <br></br>
            <label>Address</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={formik.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            <span id="errDisplay">
              {formik.touched.address && formik.errors.address
                ? formik.errors.address
                : ""}
            </span>
            <br></br>
            <label>Phone</label>
            <input
              className="form-control mb-4"
              type="text"
              name="phone"
              value={formik.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            <span id="errDisplay">
              {formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""}
            </span>
            <br></br>
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={formik.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Select Status</option>
              <option value="published">published</option>
              <option value="draft">Draft</option>
              <option value="deleted">Deleted</option>
            </select>
            <span id="errDisplay">
              {formik.touched.status && formik.errors.status
                ? formik.errors.status
                : ""}
            </span>
            <br></br>
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
