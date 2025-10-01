import { useState, useEffect } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await API.get("/doctors/my-patients");
      setDoctors(data.data || data);
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/patients", { name, age: parseInt(age), gender, contact, doctorId: parseInt(doctorId) });
      alert("Patient added!");
      navigate("/patients");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding patient");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full"/>
        <input placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} className="border p-2 w-full"/>
        <select value={gender} onChange={e=>setGender(e.target.value)} className="border p-2 w-full">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input placeholder="Contact" value={contact} onChange={e=>setContact(e.target.value)} className="border p-2 w-full"/>
        <select value={doctorId} onChange={e=>setDoctorId(e.target.value)} className="border p-2 w-full">
          <option value="">Select Doctor</option>
          {doctors.map(d=>(
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatient;
