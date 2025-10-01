import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await API.get("/doctors/my-patients");
      setPatients(data.data || data);
    };
    fetchPatients();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">My Patients</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.contact}</td>
              <td>
                <Link to={`/doctors/${p.id}/add-treatment`} className="text-blue-500">Add Treatment</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPatients;
