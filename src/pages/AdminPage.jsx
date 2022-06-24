import React from 'react'
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
const AdminPage = () => {
  return (
    <>
    <div>
    <SideBar />
  </div>
     <div className="container">
          <div className="content">
              <h3>Hello, <span>Admin</span> </h3>
              <h1>Welcome <span>  </span> </h1>
              <p>There is an admin page</p>
              <Link to="login" className="btn">Login</Link>
              <Link to="register" className="btn">Register</Link>
              <Link to="panel.php" className="btn">Admin Panel</Link>
          </div>
      </div>
      </>
  )
}
export default AdminPage;