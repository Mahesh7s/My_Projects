import React, { useEffect, useState } from "react";
import fetchWithAuth from "../utils/helper";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch user profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetchWithAuth("https://full-stack-4iu6.onrender.com/users/getProfile", {
          method: "POST"
        });
        const result = await res.json();
        if (res.ok) {
          setProfile(result.user);
        } else {
          setError(result.Message || "Failed to fetch profile");
        }
      } catch (err) {
        setError("Error fetching profile");
      }
    }
    loadProfile();
  }, []);

  // ✅ Fetch all resources
  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetchWithAuth("https://full-stack-4iu6.onrender.com/resources/getAll");
        const result = await res.json();
        if (res.ok) {
          setResources(result.resources || []);
        } else {
          setError(result.Message || "Failed to fetch resources");
        }
      } catch (err) {
        setError("Error fetching resources");
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, []);

  // ✅ Add resource
  async function handleAddResource(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields");
      return;
    }
    try {
      const res = await fetchWithAuth("https://full-stack-4iu6.onrender.com/resources/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });
      const result = await res.json();
      if (res.ok) {
        setResources((prev) => [...prev, result.resource]); // Update UI instantly
        setTitle("");
        setDescription("");
      } else {
        alert(result.Message || "Failed to add resource");
      }
    } catch (err) {
      console.error(err);
    }
  }

  // ✅ Delete resource
  async function handleDeleteResource(id) {
    try {
      const res = await fetchWithAuth(`https://full-stack-4iu6.onrender.com/resources/delete/${id}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (res.ok) {
        setResources((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert(result.Message || "Failed to delete resource");
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const isAdminOrMod = profile?.role === "admin" || profile?.role === "moderator";

  // ✅ Role-based filtering
  const filteredResources =
    profile?.role === "user"
      ? resources.filter((r) => r.createdBy === profile._id)
      : resources;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>
        Welcome, <strong>{profile?.name}</strong> ({profile?.role})
      </p>

      {/* ✅ Add Resource Form */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add Resource</h3>
        <form onSubmit={handleAddResource}>
          <input
            type="text"
            placeholder="Resource Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "300px" }}
          />
          <textarea
            placeholder="Resource Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ display: "block", marginBottom: "10px", width: "300px", height: "80px" }}
          />
          <button type="submit">Add Resource</button>
        </form>
      </div>

      {/* ✅ Resource List */}
      <h3>Resources</h3>
      {filteredResources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredResources.map((r) => (
            <li key={r._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <strong>{r.title}</strong>
              <p>{r.description}</p>
              <small>Created By: {r.createdBy}</small>
              {(isAdminOrMod || r.createdBy === profile._id) && (
                <button
                  style={{ marginLeft: "10px", color: "red" }}
                  onClick={() => handleDeleteResource(r._id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
