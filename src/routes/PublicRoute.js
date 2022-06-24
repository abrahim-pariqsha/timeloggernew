
// import { Navigate,  Route, RouteProps } from "react-router-dom";

// const PublicRoute = ( {children} ) => {
//   const token = localStorage.getItem("token");

//   return token ? <Navigate to="/"/> : children
// //   return (
// //     <Route
// //       {...rest}
// //       render={({ location }) =>
// //         token ? (
// //           <Navigate
// //             to={{
// //               pathname: "/",
// //               state: { from: location },
// //             }}
// //           />
// //         ) : (
// //           children
// //         )
// //       }
// //     />
// //   );
// };

// export default PublicRoute;
const { Navigate } = require("react-router-dom");
import React from 'react';

import Login from '../pages/Login';

function PublicRoute({ children }) {
  // const token = localStorage.getItem("token")
  const token = sessionStorage.getItem("token")

  return !token ? <Login /> : children;

}

export default PublicRoute;