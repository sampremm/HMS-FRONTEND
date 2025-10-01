import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await API.get(`/patients/${patientId}`);
        setPatient(data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching patient");
      }
    };
    fetchPatient();
  }, [patientId]);

  if (!patient) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Contact:</strong> {patient.contact}</p>
      <p><strong>Doctor:</strong> {patient.doctor?.name || "-"}</p>

      <h3 className="text-lg font-bold mt-4">Treatments</h3>
      <ul>
        {patient.treatments.length ? patient.treatments.map(t => (
          <li key={t.id}>{t.description} ({new Date(t.date).toLocaleDateString()})</li>
        )) : <li>No treatments</li>}
      </ul>

      <h3 className="text-lg font-bold mt-4">Bills</h3>
      <ul>
        {patient.bills.length ? patient.bills.map(b => (
          <li key={b.id}>₹{b.amount} - {b.pdfUrl ? <a href={b.pdfUrl} target="_blank">PDF</a> : "No PDF"}</li>
        )) : <li>No bills</li>}
      </ul>

      <h3 className="text-lg font-bold mt-4">Lab Reports</h3>
      <ul>
        {patient.labReports.length ? patient.labReports.map(l => (
          <li key={l.id}><a href={l.fileUrl} target="_blank">{l.fileUrl.split("/").pop()}</a></li>
        )) : <li>No lab reports</li>}
      </ul>
    </div>
  );
};

export default PatientDetails;
