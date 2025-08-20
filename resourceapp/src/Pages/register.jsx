import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  }

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true)
  try {
    const response = await fetch("https://full-stack-4iu6.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
      // Show backend error message instead of generic one
      throw new Error(data.message || "Failed to register");
    }

    console.log("User registered:", data);
    alert("User Registered");
	navigate("/login");

  } catch (error) {
    console.error("Error:", error.message);
    alert(`Registration failed: ${error.message}`);
  }
  finally{
	setUser({name:"",email:"",password:"",role:"user"});
  }
  setLoading(false)
}


  return (
    <>
      <h1>Welcome to Register Page</h1>
      <h3>Register here</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          required
          value={user.name}
          onChange={handleChange}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
          value={user.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          required
          value={user.password}
          onChange={handleChange}
        />
        <br />

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
        <br /><br />

        <button type="submit" disabled={loading}>
  {loading ? "Registering..." : "Register"}
</button>
      </form>
    </>
  );
};

export default Register;
