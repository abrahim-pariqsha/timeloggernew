import React, { useState } from "react";
import Loader from "../components/loader/loader";
function ResetPass() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function HandleClick(e) {
    e.preventDefault();
    setLoading(true);
    let res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/auth/password/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: { type: String }, password: password }),
      }
    );
    setLoading(false);
    const result = await res.json();
    sessionStorage.setItem("user", JSON.stringify(result.data.user));
    sessionStorage.setItem("token", result.data.token);
    setPassword("");
  }
  return (
    <div className="form-container">
      <form>
        <h3>Reset Password</h3>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="Conform password"
          placeholder="Conform Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button
          className="btn top-btn bg-gradient-primary btn-set-task w-sm-100 emp-btn"
          onClick={HandleClick}
        >
          Conform
        </button>
      </form>
    </div>
  );
}

export default ResetPass;
