import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide button on these pages
  const hiddenPaths = ["/", "/login", "/signup"];
  const isHidden = hiddenPaths.includes(location.pathname);

  if (isHidden) return null;

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 999,
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      ⬅ Back
    </button>
  );
};

export default BackButton;
