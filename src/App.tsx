import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Album from "./pages/Album";
import { Add } from "./pages/Add";
import Images from "./pages/Images";
import Albums from "./ui/Albums";
import Profile from "./pages/Profile";
import { Navigation } from "./ui/Nav";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <MainContent isAuthenticated={isAuthenticated} />
    </Router>
  );
};

// ✅ Extracted MainContent for cleaner structure
const MainContent: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const location = useLocation(); // ✅ Use useLocation() instead of window.location

  return (
    <div className="h-auto w-screen flex justify-center items-center overflow-x-hidden ">
    
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/album/:album_id" element={<Album />} />
        <Route path="/dashboard/albums" element={<Albums />} />
        <Route path="/dashboard/images" element={<Images />} />
        <Route path="/dashboard/add" element={<Add />} />
      </Routes>

      {/* ✅ Show Navbar only if user is not on login/signup */}
      {!["/signup", "/login"].includes(location.pathname) && <Navigation/>}
    </div>
  );
};

export default App;
