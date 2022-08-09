import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { token } from "../../../Constants/Contansts";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import createClient from "../../../Client/Client";
function Add({ handleAdd, clientAdd, show }) {

  const [loading, setLoading] = useState(false)
const PASS=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const EMAIL= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const validation=yup.object({
    email:yup.string().matches(EMAIL,"Enter a valid email").required(),
    first_name:yup.string().required(),
    last_name:yup.string().required(),
    company:yup.string().required(),
    address:yup.string().required(),
    phone:yup.number().required(),
    status:yup.string().required(),
  })

  
  
  const onSubmit = async (values) => {
    // console.log("col", values)
    const { email,first_name,last_name,company,status} = values;
    const user = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      company: company,
      status: "active",
    };
    // console.log(user,"adddata")
    setLoading(true)  
    const Client = createClient(sessionStorage.getItem("token"));
    const res = await Client
      .post("users", user)
      .catch((err) => {
        if (err && err.response) {
          console.log(err);
        }
      });
    if (res) {
      // console.log(res)
    }
    const {id,address,phone } = values;
    const employee = {
      status: "published",
          phone:phone,
          user: res.data.data.id,
          address:address,
    }
    const response = await Client
      .post("items/client?fields=*.*", employee)
      .catch((err) => {
        if (err && err.response) {
          console.log(err);
        }
      });
    if (response) {
      // console.log(response)
    }
    clientAdd();
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
        last_name: "",
        email: "",
        gender: "",
        dob: "",
        status: "",
        address: "",
        phone: "",
    },
    validateOnBlur: true,
    validationSchema: validation,
    onSubmit,
  });
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
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
             <span id="errDisplay">{formik.touched.first_name && formik.errors.first_name ?  "Enter first name" :""}</span>
             <br></br>
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">{formik.touched.last_name && formik.errors.last_name ?  "Enter Last name" :""}</span>
            <br></br>
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">{formik.touched.email && formik.errors.email ?  formik.errors.email :""}</span>
            <br></br>
            <label>Company Name</label>
            <input
              className="form-control"
              type="text"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
             <span id="errDisplay">{formik.touched.company && formik.errors.company ?  formik.errors.company :""}</span>
            <br></br>
            <label>Address</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">{formik.touched.address && formik.errors.address ?  formik.errors.address :""}</span>
            <br></br>
            <label>Phone</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
             <span id="errDisplay">{formik.touched.phone && formik.errors.phone ?  formik.errors.phone :""}</span>
            <br></br>
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Select Status</option>
              <option value="published">published</option>
              <option value="action">Action</option>
              <option value="draft">Draft</option>
            </select>
            <span id="errDisplay">{formik.touched.status && formik.errors.status ?  formik.errors.status :""}</span>
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

export default Add;
