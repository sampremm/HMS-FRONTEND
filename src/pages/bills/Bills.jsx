import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const Bills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const { data } = await API.get("/bills");
      setBills(data.data || data);
    };
    fetchBills();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Bills</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Amount</th>
            <th>Issued At</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id} className="border-t">
              <td>{b.patient?.name}</td>
              <td>₹{b.amount}</td>
              <td>{new Date(b.issuedAt).toLocaleDateString()}</td>
              <td>{b.pdfUrl ? <a href={b.pdfUrl} target="_blank">View PDF</a> : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bills;
