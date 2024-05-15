import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const UserRoute = () => {
  const token = Cookies.get("userToken");
    let decode = null;

   try {
     // Ensure token exists before attempting to decode
     if (token) {
       decode = jwtDecode(token);
     }
   } catch (error) {
     // Handle decoding errors (e.g., invalid token format)
     console.error("Error decoding token:", error);
   }

  return (
    <div>
      {token && decode && decode.role === "user" ? (
        <Outlet />
      ) : (
        <Navigate to={"/signin"} />
      )}
    </div>
  );
};
