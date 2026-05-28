import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="auth-page">
      <div className="auth-card" style={{textAlign:"center"}}>
        <img style={{width:120}}
          src={
            user.image ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profileImage"
        />
        <h2>{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>
        <span className="profile-role">{user.role.toUpperCase()}</span>
        <p className="profile-id">User ID: {user._id}</p>
      </div>
    </div>
  );
};

export default UserProfile;