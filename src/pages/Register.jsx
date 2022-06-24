import React from "react";
import { Link } from "react-router-dom";
// import Login from "./Login";
function Register() {
  return (
    <div className="form-container">
      <form action="register_form.php" method="post">
        <h3>Register Now</h3>

        <input type="text" name="name" placeholder="Enter Your Name" required />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          required
        />
        <select name="user_type">
          <option value="admin"> admin </option>
          <option value="user"> user </option>
          <option value="client"> client </option>
        </select>
        <select name="status">
          <option value="active"> active </option>
          <option value="inactive"> inactive </option>
        </select>

        <input
          type="submit"
          name="submit"
          value="register now"
          className="form-btn"
        />
        <p>
          Already have an account? <Link to='/'>Login Now</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
