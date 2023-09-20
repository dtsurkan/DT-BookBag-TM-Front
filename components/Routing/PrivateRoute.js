// // // import React from "react";

// // import { useRouter } from "next/router";
// // import { useSelector } from "react-redux";
// // const PrivateRoute = ({ children }) => {
// //   const { profile } = useSelector((state) => state.user);
// //   const router = useRouter();

// //   if (profile) {
// //     router.push("/login");
// //   }
// //   return <div>{children}</div>;
// // };

// // export default PrivateRoute;

// import React from "react";
// import Router from "next/router";
// import { useSelector } from "react-redux";

// const login = "/login?redirected=true"; // Define your login route address.

// /**
//  * Check user authentication and authorization
//  * It depends on you and your auth service provider.
//  * @returns {{auth: null}}
//  */
// const checkUserAuthentication = () => {
//   //   const { profile } = useSelector((state) => state.user);
//   //   return profile; // change null to { isAdmin: true } for test it.
//   return { auth: null };
// };

// export default (WrappedComponent) => {
//   const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

//   hocComponent.getInitialProps = async (context) => {
//     const userAuth = await checkUserAuthentication();
//     // console.log("context", context);
//     console.log("userAuth", userAuth);
//     // Are you an authorized user or not?
//     if (!userAuth?.auth) {
//       // Handle server-side and client-side rendering.
//       if (context.res) {
//         context.res?.writeHead(302, {
//           Location: login,
//         });
//         context.res?.end();
//       } else {
//         Router.replace(login);
//       }
//     } else if (WrappedComponent.getInitialProps) {
//       const wrappedProps = await WrappedComponent.getInitialProps({
//         ...context,
//         auth: userAuth,
//       });
//       return { ...wrappedProps, userAuth };
//     }

//     return { userAuth };
//   };

//   return hocComponent;
// };
