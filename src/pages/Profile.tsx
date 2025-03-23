import  { useState, useEffect } from "react";
import {  Heart, Calendar, MessageSquare, Settings, Edit, Camera, Share2, Bell, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface CoupleData {
  name1: string | null;
  name2: string | null;
  imgM: string | null;
  imgF: string | null;
}

const Profile = () => {
  const [coupleData, setCoupleData] = useState<CoupleData>({
    name1: null,
    name2: null,
    imgM: null,
    imgF: null
  });
  
  const [anniversary, setAnniversary] = useState<string | null>(null);
  const [daysCount, setDaysCount] = useState<number | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from localStorage
    const name1 = localStorage.getItem("name_1");
    const name2 = localStorage.getItem("name_2");
    const imgM = localStorage.getItem("m_url");
    const imgF = localStorage.getItem("f_url");
    const anniv = localStorage.getItem("anniversary");
    
    setCoupleData({
      name1: name1 || "Partner One",
      name2: name2 || "Partner Two",
      imgM,
      imgF
    });
    
    setAnniversary(anniv || "01-09-2024");
    
    // Calculate days together if anniversary exists
    if (anniv) {
      const startDate = new Date(anniv);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(diffDays);
    }
  }, []);
  
  // Generate random Unsplash image URLs if profile images are not available
  const getRandomUnsplashUrl = (seed: string) => {
    return `https://source.unsplash.com/random/300x300/?portrait,${seed}`;
  };
  
  const maleImgUrl = coupleData.imgM || getRandomUnsplashUrl("male");
  const femaleImgUrl = coupleData.imgF || getRandomUnsplashUrl("female");

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name_1");
    localStorage.removeItem("name_2");
    localStorage.removeItem("m_url");
    localStorage.removeItem("f_url");
    localStorage.removeItem("anniversary");

    // Redirect to login or dashboard
    navigate("/login"); // Change this to your desired route
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-screen bg-white/90 backdrop-blur-md shadow-lg">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors">
              ← Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all">
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={handleLogout} 
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all"
              >
                <LogOutIcon/>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-screen px-4 md:px-6 py-8">
        <div className="max-w-[2000px] mx-auto">
          {/* Profile Section */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl mb-8">
            <div className="relative flex flex-col md:flex-row items-center justify-between">
              {/* Profile Pictures */}
              <div className="flex items-center mb-8 md:mb-0">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={maleImgUrl} 
                      alt={coupleData.name1 || "Partner"}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getRandomUnsplashUrl("person1");
                      }}
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                <div className="mx-4 bg-gradient-to-br from-pink-500 to-purple-500 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>

                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={femaleImgUrl}
                      alt={coupleData.name2 || "Partner"}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getRandomUnsplashUrl("person2");
                      }}
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end mb-2">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {coupleData.name1} & {coupleData.name2}
                  </h2>
                  <button className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {daysCount && (
                  <p className="text-lg text-gray-600">
                    {daysCount} days of amazing journey together
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-pink-100 rounded-xl mr-4">
                    <Calendar className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Anniversary</h3>
                    <p className="text-gray-600">
                      {anniversary ? new Date(anniversary).toLocaleDateString() : "Not set"}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="h-2 w-full bg-pink-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4">
                    <Heart className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Memories</h3>
                    <p className="text-gray-600">250 photos shared</p>
                  </div>
                </div>
                <Link to="/dashboard/albums" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </Link>
              </div>
              <div className="h-2 w-full bg-purple-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                    <MessageSquare className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Messages</h3>
                    <p className="text-gray-600">Daily streak: 7 days</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="h-2 w-full bg-indigo-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <Calendar className="w-6 h-6 mb-2" />
                <span className="block font-medium">Plan Date</span>
              </button>
              <button className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <Heart className="w-6 h-6 mb-2" />
                <span className="block font-medium">Add Memory</span>
              </button>
              <button className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <MessageSquare className="w-6 h-6 mb-2" />
                <span className="block font-medium">Send Message</span>
              </button>
              <button className="p-4 rounded-2xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <Settings className="w-6 h-6 mb-2" />
                <span className="block font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;