import { useState } from "react";
import API from "../../api/axios";

const LabUpload = () => {
  const [patientId, setPatientId] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !patientId) return alert("Select file and patient");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", patientId);

    try {
      await API.post("/labs", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Lab report uploaded!");
      setFile(null);
      setPatientId("");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Upload Lab Report</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="number" placeholder="Patient ID" value={patientId} onChange={e=>setPatientId(e.target.value)} className="border p-2 w-full"/>
        <input type="file" onChange={e=>setFile(e.target.files[0])} className="border p-2 w-full"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default LabUpload;
