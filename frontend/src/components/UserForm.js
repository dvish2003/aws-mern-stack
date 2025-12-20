"use client";
import { apiClient } from "@/service/apiClient";
import React, { useState } from "react";

const UserForm = ({ onUserSaved }) => {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", userForm);
    setStatus("Submitting...");
    setError("");

    try {
      const response = await apiClient("user/register", "POST", userForm);

      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
      }

      setStatus("User registered successfully");
      setUserForm({ name: "", email: "", password: "" });
      if (onUserSaved) onUserSaved();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setStatus("");
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <header className="mb-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl">User Form</h2>
      </header>

      <div className="w-auto">
        <form className="grid grid-cols gap-2" onSubmit={handleSubmit}>
          <input
            className="w-[30vh] p-2"
            type="text"
            placeholder="Input Name"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          />
          <input
            className="w-[30vh] p-2"
            type="email"
            placeholder="Input Email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
          />
          <input
            className="w-[30vh] p-2"
            type="password"
            placeholder="Input Password"
            value={userForm.password}
            onChange={(e) =>
              setUserForm({ ...userForm, password: e.target.value })
            }
          />

          <button className="w-[30vh] p-2 bg-blue-500 text-white" type="submit">
            Submit
          </button>
        </form>
        {status && <p className="mt-3 text-green-600">{status}</p>}
        {error && <p className="mt-3 text-red-600">{error}</p>}
      </div>
    </section>
  );
};

export default UserForm;
