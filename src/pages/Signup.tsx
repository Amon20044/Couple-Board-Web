import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, Camera, ArrowRight, X } from "lucide-react";
// import { uploadToCloudinary } from "@/utils/cloudinary";

const url = import.meta.env.VITE_BACKEND_URI_DEV;
import imgBBuploader from "@/utils/imgBB";
const Signup: React.FC = () => {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [name2, setName2] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo1, setPhoto1] = useState<File | null>(null);
  const [photo2, setPhoto2] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPhoto: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = (setPhoto: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    setPhoto(null);
    setPreview(null);
  };
  async function uploadBothImages(photo1: File, photo2: File): Promise<[string, string]> {
    try {
      const [url_m, url_f] = await Promise.all([
        imgBBuploader(photo1),
        imgBBuploader(photo2)
      ]);
      return [url_m, url_f];
    } catch (error) {
      console.error("Parallel image upload failed:", error);
      throw error;
    }
  }
  
  const validateForm = () => {
    // Trim all inputs to remove whitespace
    console.log("Validating form with values:", {
      name1, email1, name2, email2, password, confirmPassword
    });

    const trimmedName1 = name1.trim();
    const trimmedEmail1 = email1.trim();
    const trimmedName2 = name2.trim();
    const trimmedEmail2 = email2.trim();

    if (!trimmedName1 || !trimmedEmail1 || !trimmedName2 || !trimmedEmail2 || !password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail1) || !emailRegex.test(trimmedEmail2)) {
      setError("Please enter valid email addresses");
      return false;
    }

    return true;
  };

  const handleSignup = async (e : any) => {
    if (!validateForm()) return;
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Match the exact field names expected by backend
      formData.append("name_1", name1);
      formData.append("partner1_email", email1);
      formData.append("name_2", name2);
      formData.append("partner2_email", email2);
      formData.append("password_hash", password);
      
      if (!photo1) {
        throw new Error("Partner 1's photo is required");
      }
      if (!photo2) {
        throw new Error("Partner 2's photo is required"); // Fixed error message
      }
      
      // Upload both images and get URLs
      const [url1, url2] = await uploadBothImages(photo1, photo2);
      
      // Add image URLs to formData
      formData.append("furl", url1);
      formData.append("murl", url2);
      
      // Log formData content for debugging
      console.log("FormData contents:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      console.log("FormData object:", formData);
      // Send the formData directly, not the formDataObject
      const response = await axios.post(`${url}/api/auth/register`, {
        name_1: name1,
        partner1_email: email1,
        name_2: name2,
        partner2_email: email2,
        password_hash: password,
        furl: url1,
        murl: url2
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Registration response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setError(error.response.data.message || "Registration failed. Please try again.");
      } else if (error instanceof Error) {
      } else {
        setError("Registration failed. Network or server error.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-10 text-pink-300 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Heart size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-10 text-purple-300 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      >
        <Heart size={64} />
      </motion.div>

      {/* Main signup card */}
      <motion.div
        className="w-full max-w-2xl p-8 rounded-2xl shadow-lg bg-white bg-opacity-60 backdrop-blur-lg border border-white border-opacity-20 m-4"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Start Your Journey Together</h2>
          <p className="text-gray-600">Create a shared account for your relationship</p>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Partner 1 & 2 details side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Partner 1 Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center text-gray-700">Partner 1</h3>

              {/* Photo upload */}
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 mb-3">
                  {preview1 ? (
                    <div className="relative w-full h-full rounded-full overflow border-2 border-pink-300">
                      <img src={preview1} alt="Preview" className="w-full rounded-full h-full object-cover" />
                      <button
                        onClick={() => clearImage(setPhoto1, setPreview1)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full rounded-full bg-pink-100 border-2 border-dashed border-pink-300 cursor-pointer hover:bg-pink-50 transition duration-200">
                      <Camera size={24} className="text-pink-500" />
                      <span className="text-xs text-pink-500 mt-1">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setPhoto1, setPreview1)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Name input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-pink-100 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 outline-none transition duration-200"
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Your Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-pink-100 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 outline-none transition duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Partner 2 Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center text-gray-700">Partner 2</h3>

              {/* Photo upload */}
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 mb-3">
                  {preview2 ? (
                    <div className="relative w-full h-full rounded-full overflow border-2 border-purple-300">
                      <img src={preview2} alt="Preview" className="w-full rounded-full h-full object-cover" />
                      <button
                        onClick={() => clearImage(setPhoto2, setPreview2)}
                        className="absolute top-0 z-30 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full rounded-full bg-purple-100 border-2 border-dashed border-purple-300 cursor-pointer hover:bg-purple-50 transition duration-200">
                      <Camera size={24} className="text-purple-500" />
                      <span className="text-xs text-purple-500 mt-1">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setPhoto2, setPreview2)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Name input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Partner's Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Partner's Name"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 outline-none transition duration-200"
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Partner's Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="partner.email@example.com"
                    value={email2}
                    onChange={(e) => setEmail2(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 outline-none transition duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-pink-100 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 outline-none transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-70 border border-pink-100 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50 outline-none transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              className="p-3 rounded-lg bg-red-50 text-red-600 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit button */}
          <motion.button
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
            onClick={(e)=>handleSignup(e)}
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
          >
            <span>Create Our Account</span>
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

          {/* Login link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-pink-600 hover:text-pink-800 transition duration-200">
                Sign in together
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;