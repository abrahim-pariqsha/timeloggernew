import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation"
import SideBar from "./SideBar";
import Loader from "../components/loader/loader";
function Details() {
  return (
    <>
    <Navigation />
    <SideBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">{/* <?php include 'sidebar.php';?> */}</div>

          <div className="col-md-9">
            <div className="head-section border-0 mb-4">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="card-header py-4 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 className="h4 mb-0">Ticket Details</h3>
                  </div>
                </div>
                {/* <!-- <div className="col-md-6">
                <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
                <a href="form/add_emp.php"  className="add-emp"><button type="button" className="btn btn-dark btn-set-task w-sm-100 emp-btn" data-bs-toggle="modal" data-bs-target="#addemp"><i className="fa fa-plus-circle" aria-hidden="true"></i>Add Employee</button></a>
                 </div>
            </div> --> */}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <h3 className="mb-5 text-secondary">Tickets: Tc-00011</h3>
                    <h4 className="mb-3">Punching time not proper</h4>
                    <p className="fs-6">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classNameical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classNameical
                      literature, discovered the undoubtable source.
                    </p>

                    <p className="fs-6">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      dont look even slightly believable. If you are going to
                      use a passage of Lorem Ipsum, you need to be sure there
                      isnt anything embarrassing hidden in the middle of text.
                      All the Lorem Ipsum generators on the Internet tend to
                      repeat predefined chunks as necessary, making this the
                      first true generator on the Internet.
                    </p>
                    <h5 className="mt-4 mb-3">Issue point</h5>
                    <ul className="list-unstyled list-style lh-lg">
                      <li>
                        <i className="fa fa-angle-double-right me-3"></i>It is a
                        long established fact that a reader will be distracted
                      </li>
                      <li>
                        <i className="fa fa-angle-double-right me-3"></i>Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text
                      </li>
                      <li>
                        <i className="fa fa-angle-double-right me-3"></i>There are
                        many variations of passages of Lorem Ipsum available
                      </li>
                      <li>
                        <i className="fa fa-angle-double-right me-3"></i>The
                        generated Lorem Ipsum is therefore always free from
                        repetition
                      </li>
                      <li>
                        <i className="fa fa-angle-double-right me-3"></i>Lorem Ipsum
                        comes from sections 1.10.32 and 1.10.33 of de Finibus
                        Bonorum et Malorum.
                      </li>
                      <li>
                        <i className="fa fa-angle-double-right me-3"></i>It has
                        survived not only five centuries, but also the leap into
                        electronic
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Created:
                    <span className="">29 May, 2020</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Created by:
                    <span className="">
                      <Link
                      //  to="javascript:void(0);"
                       >Birju Cuda</Link>
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Priority:
                    <span className="badge bg-danger">
                      Highest <i className="fa fa-caret-down"></i>
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Status:
                    <span className="badge bg-success">Working</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
