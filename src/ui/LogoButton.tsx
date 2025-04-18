import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const LogoButton = () => {
  const navigate = useNavigate();

  // Handler for navigating to root on click
  const handleNavigateToRoot = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-3" onClick={handleNavigateToRoot}>
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg cursor-pointer">
        <FaHeart className="text-2xl text-white" />
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
        Couple Board
      </h1>
    </div>
  );
};

export default LogoButton;
