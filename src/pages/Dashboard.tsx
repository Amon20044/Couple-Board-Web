import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Albums from "../ui/Albums";
import Images from "./Images";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [name1, setName1] = useState<string | null>(null);
  const [name2, setName2] = useState<string | null>(null);

  useEffect(() => {
    const storedName1 = localStorage.getItem("name_1");
    const storedName2 = localStorage.getItem("name_2");

    if (storedName1 && storedName2) {
      setName1(storedName1);
      setName2(storedName2);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name_1");
    localStorage.removeItem("name_2");
    navigate("/login");
  };

  return (
    <div className="">
      <h2>Dashboard</h2>
      {name1 && name2 ? (
        <div>
        <h3>Hello, {name1} & {name2}!</h3>
        <Albums/>
        <Images/>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
