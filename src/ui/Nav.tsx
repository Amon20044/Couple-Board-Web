import { Home, Image, FolderHeart, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";   

interface NavItem {
  icon: React.FC<any>;
  path: string;
  label: string;
}

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarHovered, setNavbarHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, percentage: 0.5 });
  
  // Define navbar items without the heart button
  const navItems: NavItem[] = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Image, path: "/dashboard/images", label: "Images" },
    { icon: FolderHeart, path: "/dashboard/albums", label: "Albums" },
    { icon: User, path: "/profile", label: "Profile" },
  ];
  
  // Insert the heart button between Images and Albums
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);
  
  // Function to check if a path is active
  const isActive = (path: string) => location.pathname === path || 
    (path !== "/" && location.pathname.startsWith(path));

  // Track mouse movement inside navbar
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = navbar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      setMousePosition({ x, percentage });
    };
    
    navbar.addEventListener('mousemove', handleMouseMove);
    return () => {
      navbar.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate navbar width based on hover state
  const getNavbarWidth = () => {
    if (!navbarHovered) return "280px";
    
    // Calculate width based on mouse position
    // Center position (0.5) = maximum width (500px)
    // Edges (0 or 1) = minimum width (400px)
    const distanceFromCenter = Math.abs(mousePosition.percentage - 0.5) * 2; // 0 at center, 1 at edges
    const maxWidth = 340;
    const minWidth = 280;
    
    // Quadratic easing - faster falloff near the edges
    const width = maxWidth - (maxWidth - minWidth) * Math.pow(distanceFromCenter, 2);
    return `${width}px`;
  };
  
  // Get scale for each item based on position relative to mouse
  const getItemSize = (index: number, position: 'left' | 'right') => {
    if (!navbarHovered) {
      // Default state - active item is slightly larger
      return isActive(position === 'left' ? leftItems[index].path : rightItems[index].path) ? 44 : 40;
    }
    
    // Calculate the actual item index in the entire navbar
    const actualIndex = position === 'left' ? index : index + leftItems.length + 1; // +1 for heart
    const totalActualItems = leftItems.length + rightItems.length + 1; // +1 for heart
    
    // Calculate the item's position percentage in the navbar
    const itemPosition = actualIndex / (totalActualItems - 1);
    
    // Distance from mouse (0 = under mouse, 1 = furthest away)
    const distance = Math.abs(mousePosition.percentage - itemPosition);
    
    // Size ranges from 32px (far) to 48px (under mouse)
    const maxSize = 60; 
    const minSize = 32;
    
    // Exponential decay formula
    return maxSize - (maxSize - minSize) * Math.min(1, Math.pow(distance * 2.5, 2));
  };
  
  return (
    <>
      
      {/* Bottom Navigation Bar */}
      <motion.div 
        ref={navbarRef}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 
                  rounded-full px-6 py-3 backdrop-blur-2xl
                  flex items-center justify-center z-40 shadow-lg"
        animate={{
          width: getNavbarWidth(),
          transition: { type: "spring", stiffness: 400, damping: 30 }
        }}
        onHoverStart={() => setNavbarHovered(true)}
        onHoverEnd={() => setNavbarHovered(false)}
      >
        {/* Left side items */}
        <div className="flex items-center">
          {leftItems.map((item, index) => (
            <NavItem 
              key={item.path}
              to={item.path} 
              icon={<item.icon />} 
              isActive={isActive(item.path)}
              size={getItemSize(index, 'left')}
            />
          ))}
        </div>
        
        {/* Heart button in the center - always pink and slightly larger */}
        <motion.div
          className="flex items-center justify-center mx-2"
          animate={{
            scale: navbarHovered ? 1.1 : 1,
          }}
        >
          <motion.button
            className="relative z-20"
            onClick={() => navigate("/dashboard/add")}
            whileTap={{ scale: 0.9 }}
          >
            <div className="bg-pink-500 rounded-full shadow-lg flex items-center justify-center relative">
              <motion.div
                className="absolute inset-0 bg-pink-400 rounded-full opacity-30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.div
                animate={{
                  width: navbarHovered ? 56 : 48,
                  height: navbarHovered ? 56 : 48,
                }}
                className="flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-6 h-6"
                >
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
        
        {/* Right side items */}
        <div className="flex items-center">
          {rightItems.map((item, index) => (
            <NavItem 
              key={item.path}
              to={item.path} 
              icon={<item.icon />} 
              isActive={isActive(item.path)}
              size={getItemSize(index, 'right')}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  size: number;
}

const NavItem = ({ to, icon, isActive, size }: NavItemProps) => {
  // Spring animation for smoother size transitions
  const sizeSpring = useSpring(size, { stiffness: 400, damping: 10 });
  
  // Update the spring value when size changes
  useEffect(() => {
    sizeSpring.set(size);
  }, [size, sizeSpring]);
  
  return (
    <Link to={to} className="mx-1">
      <motion.div 
        className="relative flex items-center justify-center"
        style={{ width: sizeSpring, height: sizeSpring }}
      >
        {isActive && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-pink-500/40"
            layoutId="navIndicator"
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        )}
        
        <div
          className={cn(
            "z-10 flex items-center justify-center w-full h-full",
            isActive ? "text-white scale" : "text-gray-400"
          )}
        >
          {icon}
        </div>
      </motion.div>
    </Link>
  );
};