import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// import Patient from "./pages/Patients/Patient.jsx"
// import AddPatient from "./pages/Patients/AddPatient.jsx";
import DoctorPatients from "./pages/Doctors/DoctorPatients.jsx";
import AddTreatment from "./pages/Doctors/AddTreatment.jsx";
import LabUpload from "./pages/labs/LabUpload.jsx";
import Bills from "./pages/bills/Bills.jsx";
import BillDetails from "./pages/bills/BillDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute roles={["ADMIN","RECEPTION"]}><Patient /></ProtectedRoute>} />
        <Route path="/patients/add" element={<ProtectedRoute roles={["ADMIN","RECEPTION"]}><AddPatient /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute roles={["DOCTOR","ADMIN"]}><DoctorPatients /></ProtectedRoute>} />
        <Route path="/doctors/:patientId/add-treatment" element={<ProtectedRoute roles={["DOCTOR"]}><AddTreatment /></ProtectedRoute>} />
        <Route path="/labs" element={<ProtectedRoute roles={["LAB"]}><LabUpload /></ProtectedRoute>} />
        <Route path="/bills" element={<ProtectedRoute roles={["ADMIN","RECEPTION"]}><Bills /></ProtectedRoute>} />
        <Route path="/bills/:id" element={<ProtectedRoute roles={["ADMIN","RECEPTION"]}><BillDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
