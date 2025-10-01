import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const AddTreatment = () => {
  const { patientId } = useParams();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/doctors/${patientId}/treatments`, { description });
      alert("Treatment added!");
      navigate("/doctors");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding treatment");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Add Treatment</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Treatment description" className="border p-2 w-full"/>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Treatment</button>
      </form>
    </div>
  );
};

export default AddTreatment;
