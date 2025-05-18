import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserProfilePage = () => {
  const { auth } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [profileData, setProfileData] = useState(auth.user);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <section className="personal-info">
          <h2>Personal Information</h2>
          <div className="profile-picture">
            <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${profileData.fullName}&fontSize=80&chars=2&size=48&radius=50&backgroundColor=5e35b1,3949ab&backgroundType=gradientLinear&backgroundRotation=0&scale=50&clip=true&textColor=ffffff&fontFamily=Verdana`} alt="Profile" />
          </div>
          <div className="info-grid">
            <div className="info-item">
              <label>User Name</label>
              {isEditing ? (
                <input type="text" value={profileData.username} />
              ) : (
                <p>{profileData.username}</p>
              )}
            </div>
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input type="text" value={profileData.fullName} />
              ) : (
                <p>{profileData.fullName}</p>
              )}
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{profileData.email}</p>
            </div>
            <div className="info-item">
              <label>Phone Number</label>
              {isEditing ? (
                <input type="tel" value={profileData.phoneNumber} />
              ) : (
                <p>{profileData.phoneNumber}</p>
              )}
            </div>

            <div className="info-item">
              <label>Address</label>
              {isEditing ? (
                <textarea value={profileData.address} />
              ) : (
                <p>{profileData.address}</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;