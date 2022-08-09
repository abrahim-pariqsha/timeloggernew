import React from "react";
import Navigation from "../components/Navigation/Navigation";
import Header from "../components/Panel/Header/Header";
// import { Link } from "react-router-dom";
import TotalTimeTracked from "../components/Panel/Card/TotalTimeTracked";
import IdelMInutes from "../components/Panel/Card/IdelMInutes";
import UnproductiveTime from "../components/Panel/Card/UnproductiveTime";
import ProductiveTime from "../components/Panel/Card/ProductiveTime";
import ManualTime from "../components/Panel/Card/ManualTime";
import MobileTime from "../components/Panel/Card/MobileTime";
import TimeLine from "../components/Panel/Card/TimeLine";
import RecentScreencaste from "../components/Panel/Card/RecentScreencaste";
import TopUsedWebAndApp from "../components/Panel/Card/TopUsedWebAndApp";
import UnproductiveWebAndApp from "../components/Panel/Card/UnproductiveWebAndApp";
import TopTasks from "../components/Panel/Card/TopTasks";
import TopProjects from "../components/Panel/Card/TopProjects";
import SideBar from "./SideBar";
import Loader from "../components/loader/loader";

function Panel() {
  return (
    <>
      <Navigation />

      {/* <!-- Header --> */}
      <div className="container-fluid" id="frontpage">
        <div className="row">
          <div className="col-2" style={{ padding: "0px" }}>
            <SideBar />
          </div>
          <div className="col" style={{ marginTop: "8%" }}>
            {/* <Header /> */}
            {/* Card */}
            <div className="row">
              {/* <div className="row g-3 mb-3 row-deck"> */}
              <div className="col-9">
                <TopTasks />
                
                </div>
                <div className="col-3">
                  <div className="card">
                    <TotalTimeTracked />
                    {/* <ProductiveTime /> */}
                  </div>
                  <br />
                  <div className="card">
                  <IdelMInutes />
                </div>
                <br />
                <div className="card">
                  <ProductiveTime />
                </div>
                
                </div>

                <div className="row">
                <div className="col-md-9" style={{ marginTop: "2%", width:"62vw" }}>
                  <TopProjects />
                </div>
              <div className="col-3">
             
              </div>
              </div>

              <div className="col-3">
                
              </div>
            </div>
          </div>
          {/* <!-- Timeline section --> */}
          {/* <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <TimeLine />
                </div>
              </div>
            </div> */}
          {/* <!-- Timeline-section end --> */}

          {/* <!-- Screencast --> */}
          {/* <div className="row">
              <div className="col-12">
                <RecentScreencaste />
              </div>
            </div> */}
          {/* <!-- screencast end --> */}

          {/* <!-- graph-box --> */}
          {/* <div className="row g-3 mb-3 row-deck">
              <div className="col-md-6">
                <TopUsedWebAndApp />
              </div>

              <div className="col-md-6">
                <UnproductiveWebAndApp />
              </div>
            </div> */}

          {/* graph-box end  */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Panel;
