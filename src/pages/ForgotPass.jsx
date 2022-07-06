import React, { useState } from 'react'

function ForgotPass() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function HandleClick(e) {
        e.preventDefault();
        setLoading(true);
        let res = await fetch(
          "http://timelogger.webstagdummy.com/timelogger/auth/password/request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email:email,reset_url:"http://localhost:3000/#/resetpass"}),
          }
        );
        setLoading(false);
        const result = await res.json();
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        setEmail(" ");  
      }
  return (
    <div className="form-container">
      <form>
        <input
          type="Email"
          name="Enter Your Email"
          placeholder="Enter Your Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn top-btn bg-gradient-primary btn-set-task w-sm-100 emp-btn"
          onClick={HandleClick}
        >
          Conform
        </button>
      </form>
    </div>
  )
}

export default ForgotPass