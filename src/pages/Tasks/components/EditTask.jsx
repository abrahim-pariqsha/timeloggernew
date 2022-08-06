import moment from "moment";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFetchProjects } from "../../../hooks/Project";
import { useFetchEmployee } from "../../../hooks/Employees";
// eslint-disable-next-line react/prop-types
function EditTask({ data: taskProp, fetchData }, handleEdit) {
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({ ...taskProp });
  // eslint-disable-next-line react/prop-types

  const onClientChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addClientUser = async (e) => {
    e.preventDefault();

    await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/task/${task.id}?fields=*.*`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: task.status,
          name: task.name,
          description: task.description,
          project: task.project,
          assigned_employee: task.employee,
          due_date: moment(task.due_date).format("YYYY-MM-DD hh:mm:ss"),
        }),
        method: "PATCH",
      }
    );
    fetchData();
    setShow(false);
    handleEdit();
    onClientChange();
  };
  // console.log(fetch);
  const { employees, getEmployees } = useFetchEmployee();

  useEffect(() => {
    getEmployees();
    // console.log("akjsdhkajsd", getEmployees)
  }, []);
  console.log(employees, "empppppp");
  const { projects, getProjects } = useFetchProjects();

  useEffect(() => {
    getProjects();
  }, []);
  if (!task) return <div></div>;
  const { name, description, employee, project, due_date, status } = task;

  console.log("due", moment(due_date).format("YYYY-MM-DD hh:mm:ss"));

  return (
    <div>
      <a onClick={() => setShow(true)}>
        <i className="fa-solid fa-user-pen"></i>
      </a>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addClientUser}>
            <label>Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="name"
              value={name}
              onChange={(e) => onClientChange(e)}
              required
            />
            <label>Description</label>
            <input
              className="form-control mb-4"
              type="text"
              name="description"
              value={description}
              onChange={(e) => onClientChange(e)}
              required
            />
            <label>Due Date</label>
            <input
              className="form-control mb-4"
              type="date"
              name="due_date"
              value={due_date}
              onChange={(e) => onClientChange(e)}
              required
            />
            <label>Project</label>
            <select
              className="form-control mb-4"
              name="project"
              value={project}
              onChange={(e) => onClientChange(e)}
              required
            >
              <option>add project</option>
              {projects?.map((d, i) => (
                <option key={i} value={d.id}>
                  {/* <option value="" disabled>{project}</option> */}
                  {d?.name}
                </option>
              ))}
            </select>
            <>
              <label>Employee</label>
              <select
                className="form-control mb-4"
                name="employee"
                value={employee}
                onChange={(e) => onClientChange(e)}
                required
              >
                <option>Select Employee</option>
                {employees?.map((d, i) => (
                  <option key={i} value={`${d?.id}`}>
                    {d?.user?.first_name}
                  </option>
                ))}
              </select>
            </>

            {/* <input
              className="form-control mb-4"
              type="text"
              name="employee"
              value={employee?.id}
              onChange={(e) => onClientChange(e)}
              required
            /> */}
            <label>Status</label>
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
export default EditTask;
