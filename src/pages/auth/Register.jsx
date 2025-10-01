import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DOCTOR");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("User registered!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 mb-2 w-full"/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 mb-2 w-full"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 mb-2 w-full"/>
        <select value={role} onChange={e=>setRole(e.target.value)} className="border p-2 mb-4 w-full">
          <option value="ADMIN">ADMIN</option>
          <option value="DOCTOR">DOCTOR</option>
          <option value="RECEPTION">RECEPTION</option>
          <option value="LAB">LAB</option>
        </select>
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
