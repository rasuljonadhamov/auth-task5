// AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import Toolbar from "./Toolbar";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from backend
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <User />
      
    </div>
  );
};

export default AdminPanel;
