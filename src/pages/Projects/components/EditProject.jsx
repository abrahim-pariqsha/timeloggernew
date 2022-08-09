import { Menu, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useFetchClient } from "../../../hooks/Clients";

// eslint-disable-next-line react/prop-types
function EditProject({ data: ProjectProp, fetchData }, handleEdit) {
  const token = sessionStorage.getItem("token");

  const [show, setShow] = useState(false);
  const [project, setProject] = useState({ ...ProjectProp });
  const onClientChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const { clients, getClients } = useFetchClient();

  useEffect(() => {
    getClients();
  }, []);

  const addClientUser = async (e) => {
    e.preventDefault();

    await fetch(
      `http://timelogger.webstagdummy.com/timelogger/items/project/${project.id}?fields=*.*`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: project.status,
          name: project.name,
          description: project.description,
          start_date: project.start_date,
          end_date: project.end_date,
          client: project.client,
        }),
        method: "PATCH",
      }
    );
    // console.log(project.client, "dsfsdf");
    fetchData();
    setShow(false);
    handleEdit();
    onClientChange();
  };
  if (!project) return <div></div>;
  const { name, description, start_date, end_date, client, status } = project;
  return (
    <div>
      <a onClick={() => setShow(true)}>
        <i className="fa-solid fa-user-pen"></i>
      </a>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addClientUser}>
            <label>Project Name</label>
            <input
              className="form-control mb-4"
              type="text"
              name="name"
              value={name}
              onChange={(e) => onClientChange(e)}
              required
            />
            <label>Project Description</label>
            <input
              className="form-control mb-4"
              type="text"
              name="description"
              value={description}
              onChange={(e) => onClientChange(e)}
              required
            />
            <label>Start Date</label>
            <input
              className="form-control mb-4"
              type="date"
              name="start_date"
              value={start_date}
              onChange={(e) => onClientChange(e)}
              required
            />
            <label>End Date</label>
            <input
              className="form-control mb-4"
              type="date"
              name="end_date"
              value={end_date}
              onChange={(e) => onClientChange(e)}
              required
            />

            <label>Client</label>
            <select
              value={client}
              name="client"
              className="form-control mb-4"
              onChange={(e) => onClientChange(e)}
            >
              <option>Select Client</option>
              {clients?.map((d, i) => (
                <option key={i} value={`${d?.id}`}>
                  {d?.user?.first_name}
                </option>
              ))}
            </select>

            <label>Project Status</label>
            <select
              id="status"
              className="form-control mb-4"
              placeholder="Status"
              name="status"
              value={status}
              onChange={(e) => onClientChange(e)}
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
export default EditProject;
