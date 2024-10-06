import React, { useState, useEffect } from "react";

const UserForm = ({ isEditing, currentUser, onSubmit }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: { street: "", city: "" },
    username: "",
    company: { name: "" },
    website: "",
  });

  useEffect(() => {
    if (isEditing && currentUser) {
      setUser(currentUser);
    }
  }, [isEditing, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      address: { ...user.address, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.email && user.phone && user.address.street && user.address.city) {
      onSubmit(user);
      setUser({
        name: "",
        email: "",
        phone: "",
        address: { street: "", city: "" },
        username: "",
        company: { name: "" },
        website: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        name="street"
        value={user.address.street}
        onChange={handleAddressChange}
        placeholder="Street"
        required
      />
      <input
        type="text"
        name="city"
        value={user.address.city}
        onChange={handleAddressChange}
        placeholder="City"
        required
      />
      <input
        type="text"
        name="company"
        value={user.company.name}
        onChange={(e) =>
          setUser({ ...user, company: { ...user.company, name: e.target.value } })
        }
        placeholder="Company (optional)"
      />
      <input
        type="url"
        name="website"
        value={user.website}
        onChange={handleChange}
        placeholder="Website (optional)"
      />
      <button type="submit">{isEditing ? "Update" : "Create"} User</button>
    </form>
  );
};

export default UserForm;
