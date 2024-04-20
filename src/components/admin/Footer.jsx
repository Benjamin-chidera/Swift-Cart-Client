import React from "react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  return (
    <section>
      {location.pathname !== "/admin/signup" &&
        location.pathname !== "/admin/signin" && (
          <div className="text-center text-xs mb-4 mt-10">
            Copyright &copy; 2024 SwiftCart Admin Dashboard. All Right Reserved.
          </div>
        )}
    </section>
  );
};
