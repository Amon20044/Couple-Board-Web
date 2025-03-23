import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, ArrowRight } from "lucide-react";

const url: string = import.meta.env.VITE_BACKEND_URI;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { data } = response;
  
        // Store token & user details securely
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("name_1", data.user.name_1);
        localStorage.setItem("name_2", data.user.name_2);
        localStorage.setItem("f_url", data.user.f_url);
        localStorage.setItem("m_url", data.user.m_url);
        // Navigate only if login is successful
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 left-10 text-pink-300 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Heart size={48} />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 text-purple-300 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      >
        <Heart size={64} />
      </motion.div>
      
      {/* Main login card */}
      <motion.div 
        className="login-box w-full max-w-md p-8 rounded-2xl shadow-lg bg-white bg-opacity-60 backdrop-blur-lg border border-white border-opacity-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="text-pink-500"
            >
              <Heart size={40} fill="#ec4899" strokeWidth={1.5} />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue your journey together</p>
        </motion.div>
        
        <motion.div 
          className="space-y-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-pink-100 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 outline-none transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-pink-600 hover:text-pink-800 transition duration-200">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-pink-100 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 outline-none transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          
          {error && (
            <motion.div 
              className="p-3 rounded-lg bg-red-50 text-red-600 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <motion.button
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
            onClick={handleLogin}
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
          >
            <span>Sign in</span>
            {isLoading ? (
              <motion.div 
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <ArrowRight size={18} />
            )}
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-pink-600 hover:text-pink-800 transition duration-200">
              Create one together
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;