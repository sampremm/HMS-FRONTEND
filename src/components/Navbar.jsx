import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="font-bold">HMS Dashboard</Link>
        {token && (
          <>
            {(role === "ADMIN" || role === "RECEPTION") && <Link to="/patients">Patients</Link>}
            {(role === "DOCTOR" || role === "ADMIN") && <Link to="/doctors">Doctor</Link>}
            {role === "LAB" && <Link to="/labs">Lab</Link>}
            {(role === "ADMIN" || role === "RECEPTION") && <Link to="/bills">Bills</Link>}
          </>
        )}
      </div>
      <div className="flex space-x-4">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
