import React from 'react'
import { Link } from 'react-router-dom'

function ClientPage() {
  return (
    <div className="container">
    <div className="content">
        <h3>Hello, <span>client</span> </h3>
        <h1>Welcome <span> </span> </h1>
        <p>There is an client page</p>
        <Link to="login_form.php" className="btn">Login</Link>
        <Link to="register_form.php" className="btn">Register</Link>
        <Link to="client.php" className="btn">Clients Dashboard</Link>
    </div>
</div>
  )
}

export default ClientPage;