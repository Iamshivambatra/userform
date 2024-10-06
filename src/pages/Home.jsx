import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Create or Update User
  const handleSubmit = (user) => {
    if (isEditing) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then(response => {
          const updatedUsers = users.map(u => u.id === user.id ? response.data : u);
          setUsers(updatedUsers);
          setIsEditing(false);
        })
        .catch(error => console.error("Error updating user:", error));
    } else {
      axios.post("https://jsonplaceholder.typicode.com/users", user)
        .then(response => setUsers([...users, response.data]))
        .catch(error => console.error("Error creating user:", error));
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  // Delete User
  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserForm
        isEditing={isEditing}
        currentUser={currentUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
