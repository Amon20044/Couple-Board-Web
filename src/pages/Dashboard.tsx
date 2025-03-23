import { useEffect, useState } from "react";
import Albums from "../ui/Albums";
import Images from "./Images";
import SkeletonLoader from "../ui/SkeletonLoader";
import { FaHeart, FaImages, FaBook, FaUser, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [name1, setName1] = useState<string | null>(null);
  const [name2, setName2] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName1 = localStorage.getItem("name_1");
    const storedName2 = localStorage.getItem("name_2");

    if (storedName1 && storedName2) {
      setName1(storedName1);
      setName2(storedName2);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50">
      {/* Header - Full Width */}
      <header className="sticky top-0 z-50 w-screen bg-white/90 backdrop-blur-md shadow-lg">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg">
                <FaHeart className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Couple Board
              </h1>
            </div>
            <Link
              to="/profile"
              className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <FaUser className="text-xl text-gray-700" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width with padding */}
      <main className="w-screen py-6 sm:py-8">
        <div className="max-w-[100vw]">
          {loading ? (
            <SkeletonLoader type="dashboard" />
          ) : (
            <div className="space-y-6 md:space-y-8 px-6">
              {/* Welcome Section - Full Width */}
              <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl ">
                <div className="w-full">
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      {name2}
                    </span>{" "}
                    &{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      {name1}
                    </span>
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg">Share and cherish your moments together ✨</p>
                </div>
              </div>

              {/* Stats Grid - Full Width, Responsive */}
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <Link to="/dashboard/images" className="flex items-center">
                        <FaImages className="text-2xl text-white" />
                      </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Photos</h3>
                    <p className="text-gray-500 mt-1">250 memories</p>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <Link to={'/dashboard/albums'}><FaBook className="text-2xl text-white" /></Link>

                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Albums</h3>
                    <p className="text-gray-500 mt-1">12 collections</p>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <FaHeart className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Together</h3>
                    <p className="text-gray-500 mt-1">Since 2024</p>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4 transform group-hover:scale-110 transition-all duration-300">
                      <FaPlus className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Create</h3>
                    <p className="text-gray-500 mt-1">New Album</p>
                  </div>
                </div>
              </div>

              {/* Content Grid - Full Width */}
              <div className="w-full">
                {/* Albums Section */}
                <div className="w-full mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">Your Albums</h3>
                      <p className="text-gray-500">Organize your precious memories</p>
                    </div>
                    <Link
                      to="/dashboard/albums"
                      className="px-4 md:px-6 py-2.5 text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  {/* Bento Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
                    {/* Left Column - Albums */}
                    <div className="space-y-6">
                      {/* Albums Grid */}
                      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 md:p-6">
                        <Albums />
                      </div>

                      {/* Stats Card */}
                      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-pink-100">
                                <FaImages className="text-lg text-pink-500" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-800">Total Photos</h5>
                                <p className="text-sm text-gray-500">250 memories</p>
                              </div>
                            </div>
                          </div>
                          <div className="h-1.5 w-full bg-pink-100 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images Section - Full Width */}
                <div className="w-screen rounded-3xl">
                  <div className="flex items-center justify-between mb-6 mt-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">Recent Images</h3>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                      View All
                    </button>
                  </div>
                  <div className="-mx-6">
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
