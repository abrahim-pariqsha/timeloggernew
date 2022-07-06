import React from "react";
import "./CSS/style.css";
import "./CSS/employee.css";
import "./CSS/task.css";
// import "./CSS/panel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Rou from "./routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "."
import PrivateRoute from "./routes/PrivateRoute";
// import { Link } from "react-router-dom";

const theme = createTheme({});
function App() {
  return (
    <>
      <div>
      <ThemeProvider theme={theme}>
         {/* <Rou /> */}
         {/* <BrowserRouter>  */}
         <Rou />
         
        {/* </BrowserRouter>  */}
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
