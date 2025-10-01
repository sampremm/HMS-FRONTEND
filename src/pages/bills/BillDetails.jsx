import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

const BillDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      const { data } = await API.get(`/bills/${id}`);
      setBill(data);
    };
    fetchBill();
  }, [id]);

  if (!bill) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Bill Details</h2>
      <p><strong>Patient:</strong> {bill.patient?.name}</p>
      <p><strong>Amount:</strong> ₹{bill.amount}</p>
      <p><strong>Issued At:</strong> {new Date(bill.issuedAt).toLocaleDateString()}</p>
      {bill.pdfUrl && <p><a href={bill.pdfUrl} target="_blank">View PDF</a></p>}
    </div>
  );
};

export default BillDetails;
