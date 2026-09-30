import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings, Package, Heart } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(name, email);
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-header-bg"></div>
      
      <div className="container profile-container">
        <aside className="profile-sidebar">
          <div className="profile-user-card">
            <div className="profile-avatar">
              <User size={40} color="var(--color-brown)" />
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          
          <nav className="profile-nav">
            <button className="profile-nav-link active">
              <User size={18} /> Profile Details
            </button>
            <button className="profile-nav-link">
              <Package size={18} /> Order History
            </button>
            <button className="profile-nav-link">
              <Heart size={18} /> Wishlist
            </button>
            <button className="profile-nav-link">
              <Settings size={18} /> Settings
            </button>
            <button className="profile-nav-link text-error" onClick={handleLogout}>
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        <main className="profile-content">
          <div className="profile-card">
            <div className="profile-card-header flex justify-between items-center">
              <h2>Account Information</h2>
              {!isEditing && (
                <button 
                  className="btn btn-outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {message && <div className="alert-success">{message}</div>}

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="input-group">
                  <label className="input-label" htmlFor="profile-name">Full Name</label>
                  <input 
                    type="text" 
                    id="profile-name" 
                    className="input-field" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label" htmlFor="profile-email">Email Address</label>
                  <input 
                    type="email" 
                    id="profile-email" 
                    className="input-field" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="flex gap-1 mt-4">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name);
                      setEmail(user.email);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{user.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Password</span>
                  <span className="detail-value">••••••••</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
