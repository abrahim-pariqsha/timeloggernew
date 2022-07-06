import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFetchClient } from "../../../hooks/Clients";

// eslint-disable-next-line react/prop-types
function AddProject({ fetchData }) {
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);
  const initaldata = {
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
    client: "",
  };
  const [project, setProject] = useState(initaldata);
  const { name, description, start_date, end_date, client, status } = project;

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const addProject = async (e) => {
    e.preventDefault();

    const data = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/items/project?fields=*.*",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: project.status,
          name: project.name,
          start_date: project.start_date,
          end_date: project.end_date,
          description: project.description,
          client: project.client,
        }),
        method: "POST",
      }
    );
    fetchData();
    setProject(initaldata);
  };

  //--------------------------- Client Data-----------------------------

  const { clients, getClients } = useFetchClient();
  console.log("clntssss", clients);

  useEffect(() => {
    getClients();
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
        Add Project
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton onClick={() => setProject(initaldata)}>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addProject}>
            <label>Project Name</label>
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
            <label>Start Date</label>
            <input
              className="form-control mb-4"
              type="date"
              placeholder="Start Date"
              name="start_date"
              value={start_date}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label>End Date</label>
            <input
              className="form-control mb-4"
              type="date"
              placeholder="End Date"
              name="end_date"
              value={end_date}
              onChange={(e) => onInputChange(e)}
              required
            />
            <>
              <label>Client</label>
              <select
                className="form-control mb-4"
                name="client"
                value={client}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option>Select Client</option>
                {clients?.map((d, i) => (
                  <option key={i} value={`${d?.id}`}>
                    {d?.user?.first_name}
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
              <option value="">Select Status</option>
              <option value="published">published</option>
              <option value="action">Action</option>
              <option value="draft">Draft</option>
            </select>

            <button
              style={{ textAlign: "right" }}
              type="submit"
              className="btn btn-primary"
              onClick={() => setShow(false)}
            >
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddProject;
