import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UserProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(auth.user);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccess('');

      // Create update DTO with only editable fields
      const updateData = {
        username: profileData.username,
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address
      };

      const response = await axios.put(
        `http://localhost:8080/users/${auth.user.id}/update`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      // Update auth context with new user data
      setAuth(prev => ({
        ...prev,
        user: response.data
      }));

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button
          className="edit-button"
          onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
        >
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
                <input type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  required />
              ) : (
                <p>{profileData.username}</p>
              )}
            </div>
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  required />
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
                <input type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  pattern="^(\\+\\d{1,3}[- ]?)?\\d{10}$"
                  title="Please enter a valid phone number"
                  required />
              ) : (
                <p>{profileData.phoneNumber}</p>
              )}
            </div>

            <div className="info-item">
              <label>Address</label>
              {isEditing ? (
                <textarea name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  required />
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