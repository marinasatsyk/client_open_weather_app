// import React, { FC, ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import { useAdmin, useAuth } from "utils/hook";

// interface AuthGuardProps {
//     children: ReactNode;
//   }

// const AuthGuardAdmin: React.FC<AuthGuardProps> = ({children}: AuthGuardProps) => {
//    const auth = useAuth();
    
//    console.log("public authGuard")
//     if(!auth ){
//         return <Navigate  to={"/connection"}/>
//     }

//     return children;
// }

// export default AuthGuardAdmin;

import React from 'react'

export default function index() {
  return (
    <div>index</div>
  )
}
