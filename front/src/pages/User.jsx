import { useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "./Toolbar";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        console.log(users);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleBlock = () => {
    axios
      .post("http://localhost:8000/block", { userIds: selectedUsers })
      .then((res) => {
        console.log("Users blocked successfully", res);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUsers.includes(user.id))
        );
        setSelectedUsers([]);
      })
      .catch((err) => {
        console.error("Error blocking users:", err);
      });
  };

  const handleUnblock = () => {
    axios
      .post("http://localhost:8000/unblock", { userIds: selectedUsers })
      .then((res) => {
        console.log("Users unblocked successfully", res);
        axios
          .get("http://localhost:8000/users")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
          });
        setSelectedUsers([]);
      })
      .catch((err) => {
        console.error("Error unblocking users:", err);
      });
  };

  const handleDelete = () => {
    axios
      .post("http://localhost:8000/delete", { userIds: selectedUsers })
      .then((res) => {
        console.log("Users deleted successfully", res);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUsers.includes(user.id))
        );
        setSelectedUsers([]);
      })
      .catch((err) => {
        console.error("Error deleting users:", err);
      });
  };

  return (
    <div>
      <h2>User Management</h2>
      <Toolbar
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
      />
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lastLoginTime}</td>
              <td>{user.registrationTime}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
