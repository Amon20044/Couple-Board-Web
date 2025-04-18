import { useState, useEffect } from "react";
import { Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoButton from "@/ui/LogoButton";

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

  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from localStorage
    const name1 = localStorage.getItem("name_1");
    const name2 = localStorage.getItem("name_2");
    const imgM = localStorage.getItem("m_url");
    const imgF = localStorage.getItem("f_url");

    setCoupleData({
      name1: name1 || "Partner One",
      name2: name2 || "Partner Two",
      imgM,
      imgF
    });

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
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-lg">
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoButton />
            <div className="flex flex-row items-center space-x-3">
              <button
                onClick={handleLogout}
                className="p-3 px-6 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-all flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5 text-red-600 hover:text-red-700" />
                <span>Logout</span> {/* Added span to make sure the text is next to the icon */}
              </button>
            </div>


          </div>
        </div>
      </header>

      <main className="w-full flex items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-100 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50 blur-2xl"></div>

            <div className="relative flex flex-col items-center gap-8">
              {/* Profile Pictures - Enhanced with animations */}
              <div
                className="relative perspective"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Animated floating hearts */}
                <div className="absolute top-0 left-6 opacity-30 animate-pulse">
                  <Heart className="w-8 h-8 text-pink-300" fill="currentColor" />
                </div>
                <div className="absolute bottom-0 right-16 opacity-30 animate-pulse delay-700">
                  <Heart className="w-6 h-6 text-pink-300" fill="currentColor" />
                </div>
                <div className="absolute top-16 right-4 opacity-30 animate-bounce">
                  <Heart className="w-4 h-4 text-pink-300" fill="currentColor" />
                </div>

                <div className="flex items-center gap-6 transition-all duration-700 ease-in-out">
                  {/* First Partner Image */}
                  <div
                    className={`group relative transition-all duration-700 ease-in-out ${isHovered ? "transform -translate-x-6 -rotate-6" : ""
                      }`}
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-4 ring-pink-100 ring-opacity-50">
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={maleImgUrl}
                          alt={coupleData.name1 || "Partner"}
                          className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getRandomUnsplashUrl("person1");
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <span className="absolute bottom-0 left-0 w-full text-center bg-white/70 backdrop-blur-sm py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {coupleData.name1}
                    </span>
                  </div>

                  {/* Heart Icon with animation */}
                  <div
                    className={`relative bg-gradient-to-br from-pink-500 to-purple-500 p-3 rounded-full shadow-lg transition-all duration-700 z-20 ${isHovered ? "transform scale-125 animate-pulse" : ""
                      }`}
                  >
                    <Heart
                      className="w-6 h-6 text-white"
                      fill="white"
                    />
                    {/* Pulsing effect around heart */}
                    <div className={`absolute inset-0 rounded-full bg-pink-400 -z-10 animate-ping opacity-30 ${isHovered ? "scale-150" : "hidden"
                      }`}></div>
                  </div>

                  {/* Second Partner Image */}
                  <div
                    className={`group relative transition-all duration-700 ease-in-out ${isHovered ? "transform translate-x-6 rotate-6" : ""
                      }`}
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-4 ring-indigo-100 ring-opacity-50">
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={femaleImgUrl}
                          alt={coupleData.name2 || "Partner"}
                          className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getRandomUnsplashUrl("person2");
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <span className="absolute bottom-0 left-0 w-full text-center bg-white/70 backdrop-blur-sm py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {coupleData.name2}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center w-full mt-2">
                <div className="mb-2">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {coupleData.name1} & {coupleData.name2}
                  </h2>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;