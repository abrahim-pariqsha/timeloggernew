import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import SideBar from "../pages/SideBar";

import Client from "../pages/Client/Client";
import ClientPage from "../pages/ClientPage";
import Details from "../pages/Details";
import Employee from "../pages/Employees/Employee";

import Login from "../pages/Login";
import Panel from "../pages/Panel";
import Projects from "../pages/Projects/Projects";
import Register from "../pages/Register";
import UserPage from "../pages/UserPage";
import Task from "../pages/Tasks/Task";
import ClientDetails from "../pages/Client/components/ClientDetails";
import TaskDetails from "../pages/Tasks/components/TaskDetails";
import DetailsEmployee from "../pages/Employees/components/DetailsEmployee";
import DetailsProject from "../pages/Projects/components/DetailsProject";
import Sessions from "../pages/session";
import SessionsScreenshots from "../pages/sessionScreenShots";
import Pagination from "../components/Pagination";
import ResetPass from "../pages/ResetPass";
import PrivateRoute from "./PrivateRoute";
import { HashRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ForgotPass from "../pages/ForgotPass";
// import PrivateRoute from "./Route";

function Rou() {
  return (
      <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Panel />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminPage"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
          <Route
          path="/clientPage"
          element={
            <PrivateRoute>
              <ClientPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/client/"
          element={
            <PrivateRoute>
              <Client />
            </PrivateRoute>
          }
        />

        <Route
          path="/sidebar"
          element={
            <PrivateRoute>
              <SideBar />
            </PrivateRoute>
          }
        />
        <Route
          path="/details"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/task"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
        <Route
          path="/sessions"
          element={
            <PrivateRoute>
              <Sessions />
            </PrivateRoute>
          }
        />
        <Route
          path="/ClientDetails/:id"
          element={
            <PrivateRoute>
              <ClientDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/DetailsEmployee/:id"
          element={
            <PrivateRoute>
              <DetailsEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/DetailsProject/:id"
          element={
            <PrivateRoute>
              <DetailsProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/TaskDetails/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        />
        
        <Route
          path="ResetPass"
          element={
            <PrivateRoute>
             {<ResetPass></ResetPass>}
            </PrivateRoute>
          }
        />
         <Route
          path="ForgotPass"
          element={
            <PublicRoute>
             {<ForgotPass></ForgotPass>}
            </PublicRoute>
          }
        />
        <Route
          path="/sessionscreenshots/:id"
          element={
            <PrivateRoute>
              <SessionsScreenshots />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
    // <>
    //   <Routes>
    //     <Route path="/" element={<Panel />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/adminPage" element={<AdminPage />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/clientPage" element={<ClientPage />} />
    //     <Route path="/client/" element={<Client />} />
    //     <Route path="/sidebar" element={<SideBar />} />
    //     <Route path="/details" element={<Details />} />
    //     <Route path="/employee" element={<Employee />} />
    //     <Route path="/projects" element={<Projects />} />
    //     <Route path="/userpage" element={<UserPage />} />
    //     <Route path="/task" element={<Task />} />
    //     <Route path="/sessions" element={<Sessions />} />
    //     <Route path="/ClientDetails/:id" element={<ClientDetails />} />
    //     <Route path="/pagination" element={<Pagination />} />
    //     <Route path="/DetailsEmployee/:id" element={<DetailsEmployee />} />
    //     <Route path="/ResetPass" element={<ResetPass></ResetPass>} />
    //     <Route path="/DetailsProject/:id" element={<DetailsProject />} />
    //     <Route
    //       path="/sessionscreenshots/:id"
    //       element={<SessionsScreenshots />}
    //     />

    //     <Route path="/TaskDetails/:id" element={<TaskDetails />} />
    //   </Routes>
    // </>
  );
}
export default Rou;
