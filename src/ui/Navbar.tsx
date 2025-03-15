import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Image, PlusCircle, FolderOpen, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-between items-center px-6 py-4 rounded-t-2xl max-w-[520px] mx-auto">
      {/* Dashboard */}
      <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
        <Home className="w-6 h-6" />
      </button>

      {/* Images */}
      <button onClick={() => navigate("/dashboard/images")} className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
        <Image className="w-6 h-6" />
      </button>

      {/* Floating Add Button */}
      <button onClick={() => navigate("/dashboard/add")} className="relative flex items-center justify-center bg-pink-500 rounded-full shadow-lg text-white scale-[2]">
        <PlusCircle />
      </button>

      {/* Albums */}
      <button onClick={() => navigate("/dashboard/albums")} className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
        <FolderOpen className="w-6 h-6" />
      </button>

      {/* Profile */}
      <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-gray-600 hover:text-pink-500 transition">
        <User className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Navbar;
