import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFetchEmployee } from "../../../hooks/Employees";
import { useFetchProjects } from "../../../hooks/Project";
import { Formik, useFormik } from "formik";
import createClient from "../../../Client/Client";
import * as yup from "yup";

import moment from "moment";

function AddTask({ fetchData }) {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  const validation = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    due_date: yup.date().required(),
    project: yup.string().required(),
    status: yup.string().required(),
  });

  const onSubmit = async (values) => {
    const { name, description, due_date, status, project,employee } = values;
    const task = {
      name: name,
      description: description,
      status: status,
      due_date:moment(due_date).format(),
      project: project,
      assigned_employee:employee,
    };
    setLoading(true);
    const Client = createClient(sessionStorage.getItem("token"));
    const res = await Client
      // console.log(res.config.data,"adddata")
      .post("items/task", task);
    if (res) {
      // console.log(res);
    }
    fetchData();
    setShow(false);
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      project: "",
      status: "",
      due_date: "",
    },
    validateOnBlur: true,
    validationSchema: validation,
    onSubmit,
  });
  
  const { employees, getEmployees } = useFetchEmployee();

  useEffect(() => {
    getEmployees();
    // console.log("akjsdhkajsd", getEmployees)
  }, []);

  const { projects, getProjects } = useFetchProjects();

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="btn top-btn bg-gradient-primary btn-set-task w-sm-100 emp-btn"
        data-bs-toggle="modal"
        data-bs-target="#addemp"
      >
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        Add Task
      </button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          {/* onClick={() => setAdd(initaldata)} */}
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formik.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">
              {formik.touched.name && formik.errors.name
                ? "Enter Your Name"
                : ""}
            </span>
            <br></br>
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={formik.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">
              {formik.touched.description && formik.errors.description
                ? "Enter description"
                : ""}
            </span>
            <br></br>
            <label>Project</label>
            <select
              className="form-control"
              name="project"
              value={formik.project}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option>add project</option>
              {projects?.map((d, i) => (
                <option key={i} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <span id="errDisplay">
              {formik.touched.project && formik.errors.project
                ? "Enter project"
                : ""}
            </span>
            <br></br>
            <label>Due Date</label>
            <input
              className="form-control"
              type="date"
              name="due_date"
              value={formik.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <span id="errDisplay">
              {formik.touched.due_date && formik.errors.due_date
                ? "Enter due date"
                : ""}
            </span>
            <br></br>

            <label>Employee</label>
            <select
              className="form-control mb-4"
              name="employee"
              value={formik.employees}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option>Select Employee</option>
              {employees?.map((d, i) => (
                <option key={i} value={d.id}>
                  {d?.user.first_name}
                </option>
              ))}
            </select>

            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={formik.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="Default">Select Status</option>
              <option value="published">published</option>
              <option value="active">active</option>
              <option value="draft">draft</option>
            </select>
            <span id="errDisplay">
              {formik.touched.status && formik.errors.status
                ? "Enter status"
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

export default AddTask;
