import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const url : string = import.meta.env.VITE_BACKEND_URI
const Signup: React.FC = () => {
  const [name1, setName1] = useState<string>("");
  const [email1, setEmail1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [email2, setEmail2] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${url}/auth/register`, {
        name_1: name1,
        partner1_email: email1,
        name_2: name2,
        partner2_email: email2,
        password_hash: password, // Password hashing should be done on the backend
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      
      <input type="text" placeholder="Your Name" value={name1} onChange={(e) => setName1(e.target.value)} />
      <input type="email" placeholder="Your Email" value={email1} onChange={(e) => setEmail1(e.target.value)} />
      
      <input type="text" placeholder="Partner's Name" value={name2} onChange={(e) => setName2(e.target.value)} />
      <input type="email" placeholder="Partner's Email" value={email2} onChange={(e) => setEmail2(e.target.value)} />
      
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Register</button>

      <p className="register-text">
        Already have an account? <Link to="/login" className="register-link">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
