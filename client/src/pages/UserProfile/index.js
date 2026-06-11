import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.users);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">

        <img
          src={
            user.image ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
        />

        <h2 className="text-xl font-bold text-gray-800">
          {user.name}
        </h2>

        <p className="text-gray-600 mt-1">{user.email}</p>

        <span className="inline-block mt-3 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
          {user.role?.toUpperCase()}
        </span>

        <p className="text-xs text-gray-400 mt-4">
          User ID: {user._id}
        </p>

      </div>
    </div>
  );
};

export default UserProfile;