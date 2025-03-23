import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Image, PlusCircle, FolderOpen, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Image, path: "/dashboard/images", label: "Images" },
    { icon: PlusCircle, path: "/dashboard/add", label: "Add" },
    { icon: FolderOpen, path: "/dashboard/albums", label: "Albums" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <motion.nav
        className="flex justify-around items-center px-6 py-3 backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-full"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute bottom-14 backdrop-blur-lg bg-[#ffffff]/70 border border-white/20 text-black text-xs px-3 py-1 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => navigate(item.path)}
                className={`relative flex items-center justify-center transition-colors duration-200 outline-none p-3 rounded-full shadow-md ${
                  active
                    ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg scale-110"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.button>
            </div>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default Navbar;
