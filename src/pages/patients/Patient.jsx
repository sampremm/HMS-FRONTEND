import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

const Patient= () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await API.get("/patients");
      setPatients(data.data || data);
    };
    fetchPatients();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Patients</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.contact}</td>
              <td>{p.doctor?.name || "-"}</td>
              <td>
                <Link to={`/patients/${p.id}`} className="text-blue-500">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
