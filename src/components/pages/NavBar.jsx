import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Root.css";

const NavBar = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname); 

  let title = "Dashboard";
  if (location.pathname.includes("/dashboard/items/edit")) {
    title = `Products / Edit `;
  } else if (location.pathname.startsWith("/dashboard/add")) {
    title = "Products / Add";
  } else if (location.pathname.startsWith("/dashboard/item")) {
    title = "Products";
  }


  const [profileImage, setProfileImage] = useState(localStorage.getItem("profile_image"));
  const [userName, setUserName] = useState(localStorage.getItem("user_name"));


  useEffect(() => {
    setProfileImage(localStorage.getItem("profile_image"));
    setUserName(localStorage.getItem("user_name"));
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>{title}</h2>
      </div>
      <div className="nav-right">
        {profileImage && (
          <div className="user-info">
            <img
              src={profileImage}
              alt="User Profile"
              width="40"
              height="40"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            <div className="user-details">
              <p>{userName || "User"}</p> 
              <p>Admin</p> 
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
