import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFetchEmployee } from "../../../hooks/Employees";
import { useFetchProjects } from "../../../hooks/Project";
// eslint-disable-next-line react/prop-types
import moment from "moment";
// eslint-disable-next-line react/prop-types
function AddTask({ fetchData }) {
  const initaldata = {
    name: "",
    description: "",
    project: "",
    status: "",
    due_date: "",
  };
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(initaldata);
  const { name, description, due_date, project, employee, status } = add;
  const onInputChange = (e) => {
    setAdd({ ...add, [e.target.name]: e.target.value });
  };

  const AddTask = async (e) => {
    e.preventDefault();

    const data = await fetch(
      "https://timelogger.webstagdummy.com/timelogger/items/task?fields=*.*",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: add.name,
          description: add.description,
          project: add.project,
          due_date:moment(add.due_date).format(),
          assigned_employee: add.employee,
          status: add.status,
        }),
      }
    );
    fetchData();
    setShow(false);
    setAdd(initaldata);
    console.log("datataask", JSON.data);

    // const res = data.json();
  };
  //----------------Add Task-----------------------------
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
        className="btn btn-dark btn-set-task w-sm-100 emp-btn"
        data-bs-toggle="modal"
        data-bs-target="#addemp"
      >
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        Add Task
      </button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton onClick={() => setAdd(initaldata)}>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddTask}>
            <label>Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Description</label>
            <input
              className="form-control mb-4"
              type="text"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>Project</label>
            <select
              className="form-control mb-4"
              name="project"
              value={project}
              onChange={(e) => onInputChange(e)}
              required
            >
              {/* <option>adadd project</option> */}
              {projects?.map((d, i) => (
                <option key={i} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <label>Due Date</label>
            <input
              className="form-control mb-4"
              type="date"
              name="due_date"
              value={due_date}
              onChange={(e) => onInputChange(e)}
              required
            />
            <>
              <label>Employee</label>
              <select
                className="form-control mb-4"
                name="employee"
                value={employee}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option>Select Employee</option>
                {employees?.map((d, i) => (
                  <option key={i} value={d.id}>
                    {d.owner.first_name}
                  </option>
                ))}
              </select>
            </>
            <label>Status</label>
            <select
              className="form-control mb-4"
              name="status"
              value={status}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="Default">Select Status</option>
              <option value="published">published</option>
              <option value="active">active</option>
              <option value="draft">draft</option>
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

export default AddTask;