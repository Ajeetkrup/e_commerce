import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../apis/api";
import Logout from "./Logout";
import ProfilePicture from "./ProfilePicture";

const Profile: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token, navigate]);

  if (!token) {
    navigate("/login");
    return null;
  }

  console.log(userData?.profileUrl)

  return (
    <div id="webcrumbs">
      <div className="bg-white p-8">
        <header className="flex items-center gap-4 mb-6">
          <ProfilePicture profileUrl={userData?.profileUrl  || ""} />
          <div>
            <h1 className="text-primary-950 font-title text-2xl">
              {userData?.name || "Loading..."}
            </h1>
            <p className="text-neutral-600">{userData?.email || "Loading..."}</p>
          </div>
        </header>

        <div className="bg-gray-50 p-6 rounded-md">
          <h2 className="text-indigo-600 font-title text-xl mb-4">
            Welcome, {userData?.name}!
          </h2>
          <p className="text-neutral-600 text-lg">
            {/* You can update your account information below: */}
          </p>
          <div className="mt-6">
            <label
              className="block text-neutral-950 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={userData?.email || ""}
              readOnly
              className="w-full p-3 border border-neutral-300 rounded-md mb-4 focus:outline-none focus:border-primary-500"
            />

            <label
              className="block text-neutral-950 font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={userData?.username || ""}
              readOnly
              className="w-full p-3 border border-neutral-300 rounded-md mb-4 focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <Logout />
      </div>
    </div>
  );
};

export default Profile;