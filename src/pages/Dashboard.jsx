import { useEffect, useState } from "react";
import API from "../api/axios.js";

const Dashboard = () => {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, bills: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const patients = await API.get("/patients");
        const doctors = await API.get("/doctors/my-patients"); // count unique doctors
        const bills = await API.get("/bills");
        setStats({
          patients: patients.data.total || patients.data.length,
          doctors: doctors.data.total || doctors.data.length,
          bills: bills.data.total || bills.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8 grid grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded">Patients: {stats.patients}</div>
      <div className="bg-green-100 p-4 rounded">Doctors: {stats.doctors}</div>
      <div className="bg-yellow-100 p-4 rounded">Bills: {stats.bills}</div>
    </div>
  );
};

export default Dashboard;
