import React, { useState } from "react";
import API from "../api/axio";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [form, setForm] = useState({ name: "", age: "", gender: "", contact: "", doctorId: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/patients", form);
      navigate("/patients");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding patient");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Add Patient</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 w-full"/>
        <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} className="border p-2 w-full"/>
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} className="border p-2 w-full"/>
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} className="border p-2 w-full"/>
        <input name="doctorId" placeholder="Doctor ID" type="number" value={form.doctorId} onChange={handleChange} className="border p-2 w-full"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatient;
