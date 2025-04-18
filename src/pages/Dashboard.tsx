import { useEffect, useState } from "react";
import Albums from "../ui/Albums";
import Images from "./Images";
import SkeletonLoader from "../ui/SkeletonLoader";
import { FaHeart, FaImages, FaBook, FaUser, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectAlbumCount } from "@/store/slices/albumsSlice";
import { selectImageCount } from "@/store/slices/imagesSlice";
import LogoButton from "@/ui/LogoButton";

const Dashboard: React.FC = () => {
  const [name1, setName1] = useState<string | null>(null);
  const [name2, setName2] = useState<string | null>(null);
  const [anniversary, setAnniversary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Correctly use Redux selectors with useSelector
  const albumCount = useSelector(selectAlbumCount);
  const imageCount = useSelector(selectImageCount);

  useEffect(() => {
    // Fetch data from localStorage
    const storedName1 = localStorage.getItem("name_1");
    const storedName2 = localStorage.getItem("name_2");
    const time = localStorage.getItem("time") || "2024-01-01";

    // Format date for display
    const dateObj = new Date(time);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (storedName1 && storedName2) {
      setName1(storedName1);
      setName2(storedName2);
    }

    setAnniversary(formattedDate);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Calculate years together
  const getYearsTogether = () => {
    if (!anniversary) return "Since 2024";

    const startYear = new Date(localStorage.getItem("anniversary") || "2024-01-01").getFullYear();
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;

    if (years < 1) return "Less than a year";
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-indigo-100">
      {/* Header - Full Width */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md px-12">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <LogoButton />
            <Link
              to="/profile"
              className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover: -md"
            >
              <FaUser className="text-xl text-gray-700" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-6 sm:py-8">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <SkeletonLoader type="dashboard" />
          ) : (
            <div className="space-y-6 md:space-y-8 px-4 md:px-6">
              {/* Welcome Section */}
              <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8  -xl">
                <div className="w-full">
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                    Welcome,{" "}
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      {name1}
                    </span>{" "}
                    &{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      {name2}
                    </span>
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg">
                    Share and cherish your moments together ✨
                    {anniversary && (
                      <span className="ml-2 text-sm text-gray-500">
                        Since {anniversary}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Stats Grid - With Redux Data */}
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Photos Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6  -lg hover: -xl transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <Link to="/dashboard/images" className="flex items-center">
                        <FaImages className="text-2xl text-white" />
                      </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Photos</h3>
                    <p className="text-gray-500 mt-1">{imageCount} memories</p>
                  </div>
                </div>

                {/* Albums Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6  -lg hover: -xl transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <Link to={'/dashboard/albums'}>
                        <FaBook className="text-2xl text-white" />
                      </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Albums</h3>
                    <p className="text-gray-500 mt-1">{albumCount} collections</p>
                  </div>
                </div>

                {/* Together Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6  -lg hover: -xl transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <Link to="/profile">
                        <FaHeart className="text-2xl text-white" />
                      </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Together</h3>
                    <p className="text-gray-500 mt-1">{getYearsTogether()}</p>
                  </div>
                </div>

                {/* Create Album Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6  -lg hover: -xl transition-all duration-300 group cursor-pointer">
                  <Link to="/dashboard/add">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                        <FaPlus className="text-2xl text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Create</h3>
                      <p className="text-gray-500 mt-1">New Album</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Content Grid */}
              <div className="w-full">
                {/* Albums Section */}
                <div className="w-full mb-6">
                  <div className="flex items-center justify-between mb-6 px-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mr-2">Your Albums</h3>
                      <p className="text-gray-500">Organize your precious memories</p>
                    </div>
                    <Link
                      to="/dashboard/albums"
                      className="px-4 md:px-6 py-2.5 max-[768px]:py-1 max-[768px]:px-3 text-center text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  {/* Bento Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
                    {/* Left Column - Albums */}
                    <div className="space-y-6">
                      {/* Albums Grid */}
                      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 md:p-6  -lg">
                        <Albums />
                      </div>


                    </div>

                    {/* Right Column - Calendar & Stats */}
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6  -lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-100">
                          <FaCalendarAlt className="text-lg text-indigo-500" />
                        </div>
                        <h4 className="font-medium text-gray-800">Your Journey</h4>
                      </div>

                      <div className="text-center p-4 mb-4 bg-gradient-to-br from-pink-50 to-indigo-50 rounded-xl">
                        <p className="text-gray-500 text-sm mb-2">Anniversary</p>
                        <p className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          {anniversary}
                        </p>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl mb-4">
                        <div>
                          <p className="text-gray-500 text-sm">Together</p>
                          <p className="font-medium text-gray-800">{getYearsTogether()}</p>
                        </div>
                        <div>
                          <FaHeart className="text-xl text-pink-500" />
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        className="w-full block text-center py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="w-full mt-8">
                  <div className="flex items-center justify-between mb-6 ">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">Recent Photos</h3>
                      <p className="text-gray-500">Your latest memories</p>
                    </div>
                    <Link
                      to="/dashboard/images"
                      className="px-4 md:px-6 py-2.5 max-[768px]:py-1 max-[768px]:px-3 text-center text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden w-[100vw]">
                    
                      <Images />
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;