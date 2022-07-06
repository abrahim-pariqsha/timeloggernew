import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader/loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();
  useEffect(() => {
    // if (localStorage.getItem("user-info")) {
    if (sessionStorage.getItem("user-info")) {
      navigate("./panel");
    }
  }, []);
  async function HandleClick(e) {
    e.preventDefault();
    let item = { email, password };
    setLoading(true)
    let res = await fetch(
      "http://timelogger.webstagdummy.com/timelogger/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }, 
        body: JSON.stringify(item),
      }
    );
    setLoading(false)
    const result = await res.json();
    // localStorage.setItem("user", JSON.stringify(result.data.user));
    // localStorage.setItem("token", result.data.token);
    sessionStorage.setItem("user", JSON.stringify(result.data.user));
    sessionStorage.setItem("token", result.data.token);
    navigate("/");
  } 
  return (
    <div className="form-container">
    {loading ? (
        <Loader />
      ) : (
      <form action="login" method="post">
        <h3>Login Now</h3>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          name="submit"
          value="login now"
          className="btn top-btn bg-gradient-primary btn-set-task w-sm-100 emp-btn"
          style={{background:"#cd1662", color:"white"}}
          onClick={HandleClick}
        >Login Now</button>
        <p id="register">
          Dont have an account? <Link to="/register">Register Now</Link>{" "}
          <br></br>
          <Link to="/ForgotPass">Forogt Password</Link>
        </p>
      </form>
      )}
    </div>
  );
}
export default Login;
/**
 * This is the login Page
 */

//  import React, { useEffect, useState } from "react";
//  import { Link } from "react-router-dom";
//  import { Button } from "react-bootstrap";
//  import { useDispatch, useSelector } from "react-redux";
//  import TextField from "@mui/material/TextField";
//  import { Grid } from "@mui/material";
//  import { Box } from "@mui/system";

//  import { login } from "../Redux/action/authAction";

// //  import Loader from "../components/Loader/loader";
 
//  import { useSearchParam } from "react-use";
 
//  function Login({ location, history }) {
//    // constant initialization for email and password
//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const [errors, setErrors] = useState({
//      email: null,
//      password: null,
//    });
 
//    // dispatch used for action calling
//    const dispatch = useDispatch();
 
//    // get error and loading info from state
//    const userLogin = useSelector((state) => state.userLoginReducer);
//    const { error, loading } = userLogin;
 
//    // submit button handler
//    const submitHandler = () => {
//      dispatch(login(email, password));
//    };
 
//    const uid = useSearchParam("uid");
//    const token = useSearchParam("token");
//    const message1 = "Success";
 
   
 
//   //  const handleResend = () => {
//   //    dispatch(resendAccount(email));
//   //  };
 
//    const validateSubmit = (e) => {
//      e.preventDefault();
 
//      submitHandler();
//    };
//    return (
//      <Grid container spacing={0} alignItems="center" justifyContent="center">
//        <Grid item md={4}>
//          <h1>LOG IN</h1>
 
//          {/* Loading */}
//          {/* {loading && <Loader />} */}
//          {/* Error */}
//          {/* {error && ( */}
//            <>
//              {/* <div>
//                <h6 style={{ color: "red" }}>
//                  {error.message ? error.message : error}
//                </h6>
//                {error.status === "Activation Pending" && (
//                  <button onClick={handleResend}>
//                    click here to resend your activation link
//                  </button>
//                )}
//              </div> */}
//            </>
//          {/* )} */}
//          <form onSubmit={validateSubmit} autoComplete="off" action="login" method="post">
//            <Grid container spacing={1}>
//              <Grid item md={12}>
//                <TextField
//                  label="Email"
//                 //  error={!!errors.email}
//                 //  helperText={errors.email}
//                  variant="standard"
//                  value={email}
//                  type="email"
//                  onChange={(e) => {
//                   //  setErrors({ ...errors, email: null });
//                    setEmail(e.target.value);
//                  }}
//                  fullWidth
//                />
//              </Grid>
 
//              <Grid item md={12}>
//                <TextField
//                  label="Password"
//                 //  error={!!errors.password}
//                 //  helperText={errors.password}
//                  variant="standard"
//                  type="password"
//                  value={password}
//                  onChange={(e) => {
//                   //  setErrors({ ...errors, password: null });
//                    setPassword(e.target.value);
//                  }}
//                  fullWidth
//                />
//              </Grid>
//              {/* <Grid item md={12}>
//                <Box display="flex" justifyContent="flex-end">
//                  <Link to="/reset-password">Forgot Password</Link>
//                </Box>
//              </Grid> */}
//            </Grid>
 
//            <Box style={{ marginTop: 40 }}>
//              <Button type="submit" className="form-control" variant="primary">
//                LOG IN
//              </Button>
//            </Box>
//            {/* <Box style={{ marginTop: 40 }} justifyContent="flex-center">
//              New user? <Link to="/user/registration">Register here</Link>
//            </Box> */}
//          </form>
//        </Grid>
//      </Grid>
//    );
//  }
 
//  export default Login;
 