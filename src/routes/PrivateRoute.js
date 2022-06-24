// import React from 'react'
// import { Navigate,  Route, RouteProps } from "react-router-dom";

// const PrivateRoute = ({ children, ...rest}) => {
//     const token = JSON.parse(localStorage.getItem("token"));
//     return token ? (
//       <Route {...rest} />
//     ) : (
//       <Navigate
//         to={{
//           pathname: "/login"
//         }}
//       />
//     );
//   };
// // const PrivateRoute = ({ children, ...rest} ) => {
// //   const token = localStorage.getItem("token");


// //   if(token ? children : <Navigate to="/login"/>)

// //   return (
// //     <Route
// //       {...rest}
// //       render={({ location }) =>
// //         token? (
// //           children
// //         ) : (
// //           <Navigate
// //             to={{
// //               pathname: "/login",
// //               state: { from: location },
// //             }}
// //           />
// //         )
// //       }
// //     />
// //   );
// // };

// export default PrivateRoute;
import { Navigate } from "react-router";
import React from "react";

function PrivateRoute({ children }) {
  // const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;