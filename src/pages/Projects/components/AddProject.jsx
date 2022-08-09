import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFetchClient } from "../../../hooks/Clients";
import { Formik, useFormik } from "formik";
import createClient from "../../../Client/Client";
import * as yup from "yup";

function AddProject({ fetchData }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);


  const validation = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    start_date: yup.date().required(),
    end_date: yup.date().required(),
    client: yup.string().required(),
    status: yup.string().required(),
  });

  const onSubmit = async (values) => {
    const { name, description, start_date, end_date, status, client } = values;
    const project = {
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      status: status,
      client: client,
    };
    setLoading(true);
    const Client = createClient(sessionStorage.getItem("token"));
    const res = await Client
      // console.log(res.config.data,"adddata")
      .post("items/project", project);
    if (res) {
      // console.log(res);
    }
    fetchData();
    setShow(false);
    setLoading(false);
  }


    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "",
        client: "",
      },
      validateOnBlur: true,
      validationSchema: validation,
      onSubmit,
    });


    const { clients, getClients } = useFetchClient();
    // console.log("clntssss", clients);

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
          <Modal.Header closeButton>
            {/* onClick={() => setProject(initaldata)} */}
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <label>Project Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={formik.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <span id="errDisplay">{formik.touched.name && formik.errors.name ?  "Enter Your Name" :""}</span>
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
              <span id="errDisplay">{formik.touched.description && formik.errors.description ?  "Enter description" :""}</span>
              <br></br>
              <label>Start Date</label>
              <input
                className="form-control"
                type="date"
                placeholder="Start Date"
                name="start_date"
                value={formik.start_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <span id="errDisplay">{formik.touched.start_date && formik.errors.start_date ?  "Enter start date" :""}</span>
              <br></br>
              <label>End Date</label>
              <input
                className="form-control"
                type="date"
                placeholder="End Date"
                name="end_date"
                value={formik.end_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <span id="errDisplay">{formik.touched.end_date && formik.errors.end_date ?  "Enter end date" :""}</span>
              <br></br>
              <>
                <label>Client</label>
                <select
                  className="form-control"
                  name="client"
                  value={formik.client}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              <span id="errDisplay">{formik.touched.client && formik.errors.client ?  "Enter client" :""}</span>
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
                <option value="action">Action</option>
                <option value="draft">Draft</option>
              </select>
              <span id="errDisplay">{formik.touched.status && formik.errors.status ?  "Enter status" :""}</span>
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
export default AddProject;
