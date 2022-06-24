import React from 'react'
import { Link } from 'react-router-dom';

const UserPage = () => {
  return (
     <div className="container">
          <div className="content">
              <h3>Hello, <span>Employee</span> </h3>
              <h1>Welcome <span>  </span> </h1>
              <p>There is an employee page</p>
              <Link to="login" className="btn">Login</Link>
              <Link to="register" className="btn">Register</Link>
              <Link to="employee" className="btn">employee Dashboard</Link>
              <Link to="dashboard"></Link>

          </div>
      </div>
  )
}
export default UserPage;