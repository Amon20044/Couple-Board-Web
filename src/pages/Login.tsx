import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
const url : string = import.meta.env.VITE_BACKEND_URI

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
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
  
        // Navigate only if login is successful
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  

  return (
    <div className="login-container w-screen h-screen flex justify-center items-center">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue your journey</p>
        <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
        <div>
          <label className="login-label">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="login-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Sign in
        </button>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/signup">register</Link>

        </p>

      </div>
    </div>
  );
};

export default Login;
