import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { LogOut, User, Settings, Package, Heart, Calendar, PawPrint, Trash2, Edit2, Plus, Star } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { pets, addPet, editPet, deletePet, appointments, cancelAppointment } = useDashboard();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, profile, pets, appointments, orders, wishlist, settings
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Pet Form State
  const [showPetForm, setShowPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petFormData, setPetFormData] = useState({ name: '', type: '', breed: '', age: '', gender: '', notes: '' });

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

  // Pet Handlers
  const handlePetSubmit = (e) => {
    e.preventDefault();
    if (editingPet) {
      editPet({ ...petFormData, id: editingPet.id });
    } else {
      addPet(petFormData);
    }
    setShowPetForm(false);
    setEditingPet(null);
    setPetFormData({ name: '', type: '', breed: '', age: '', gender: '', notes: '' });
  };

  const openEditPet = (pet) => {
    setEditingPet(pet);
    setPetFormData(pet);
    setShowPetForm(true);
  };

  const handleDeletePet = (petId) => {
    if(window.confirm("Are you sure you want to delete this pet?")) {
      deletePet(petId);
    }
  };

  const handleCancelAppt = (apptId) => {
    if(window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(apptId);
    }
  };

  const renderOverview = () => {
    const upcomingAppts = appointments.filter(a => a.status === 'Confirmed' && new Date(a.date) >= new Date());
    return (
      <div className="dashboard-overview profile-card">
        <h2 className="mb-6">Welcome back, {user.name}!</h2>
        <div className="grid md-grid-cols-2 gap-4">
          <div className="dashboard-card bg-warm-peach">
            <h3 className="flex items-center gap-2 mb-4"><PawPrint size={20} /> My Pack</h3>
            {pets.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {pets.slice(0, 3).map(pet => (
                  <div key={pet.id} className="bg-white px-4 py-2 rounded-full text-sm font-bold border border-border">
                    {pet.name}
                  </div>
                ))}
                {pets.length > 3 && <span className="px-4 py-2 text-sm">+{pets.length - 3} more</span>}
              </div>
            ) : (
              <p>You haven't added any pets yet.</p>
            )}
            <button className="btn btn-outline mt-4 text-sm" onClick={() => setActiveTab('pets')}>Manage Pets</button>
          </div>

          <div className="dashboard-card bg-sage">
            <h3 className="flex items-center gap-2 mb-4"><Calendar size={20} /> Next Appointment</h3>
            {upcomingAppts.length > 0 ? (
              <div>
                <p className="font-bold">{upcomingAppts[0].serviceName} for {upcomingAppts[0].petName}</p>
                <p>{upcomingAppts[0].date} at {upcomingAppts[0].time}</p>
              </div>
            ) : (
              <p>No upcoming appointments.</p>
            )}
             <button className="btn btn-outline mt-4 text-sm" onClick={() => setActiveTab('appointments')}>View All</button>
          </div>
        </div>
      </div>
    );
  };

  const renderPets = () => (
    <div className="dashboard-pets profile-card">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h2 className="m-0">My Pets</h2>
        {!showPetForm && <button className="btn btn-primary text-sm" onClick={() => setShowPetForm(true)}><Plus size={16}/> Add Pet</button>}
      </div>

      {showPetForm ? (
        <form onSubmit={handlePetSubmit} className="profile-card mb-6">
          <h3 className="mb-4">{editingPet ? 'Edit Pet' : 'Add New Pet'}</h3>
          <div className="grid sm-grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Name</label>
              <input type="text" className="input-field" value={petFormData.name} onChange={e => setPetFormData({...petFormData, name: e.target.value})} required />
            </div>
            <div className="input-group">
              <label className="input-label">Type (Dog, Cat, etc.)</label>
              <input type="text" className="input-field" value={petFormData.type} onChange={e => setPetFormData({...petFormData, type: e.target.value})} required />
            </div>
            <div className="input-group">
              <label className="input-label">Breed</label>
              <input type="text" className="input-field" value={petFormData.breed} onChange={e => setPetFormData({...petFormData, breed: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Age</label>
              <input type="text" className="input-field" value={petFormData.age} onChange={e => setPetFormData({...petFormData, age: e.target.value})} />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Special Notes (e.g. Allergies)</label>
            <textarea className="input-field" rows="3" value={petFormData.notes} onChange={e => setPetFormData({...petFormData, notes: e.target.value})}></textarea>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary">Save Pet</button>
            <button type="button" className="btn btn-outline" onClick={() => {setShowPetForm(false); setEditingPet(null);}}>Cancel</button>
          </div>
        </form>
      ) : null}

      {!showPetForm && pets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-dashed border-2 border-border">
          <PawPrint size={48} className="mx-auto mb-4" style={{color: 'var(--color-sage)'}} />
          <h3 className="mb-2">Your pack is missing someone.</h3>
          <p className="mb-4 text-gray-500">Add your first furry friend to keep their info handy.</p>
        </div>
      ) : (
        <div className="grid md-grid-cols-2 gap-4">
          {!showPetForm && pets.map(pet => (
            <div key={pet.id} className="profile-card pet-card flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-terracotta m-0">{pet.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openEditPet(pet)} className="text-olive hover:text-brown"><Edit2 size={16}/></button>
                  <button onClick={() => handleDeletePet(pet.id)} className="text-error hover:text-red-700"><Trash2 size={16}/></button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{pet.breed} • {pet.type} • {pet.age}</p>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-sm"><strong>Notes:</strong> {pet.notes || 'None'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAppointments = () => {
    const upcoming = appointments.filter(a => a.status === 'Confirmed');
    const past = appointments.filter(a => a.status !== 'Confirmed');

    return (
      <div className="dashboard-appointments profile-card">
        <h2 className="mb-6 border-b border-border pb-4">Appointments</h2>
        
        <h3 className="mb-4 text-lg">Upcoming</h3>
        {upcoming.length === 0 ? (
           <div className="text-center py-8 bg-white rounded-lg border border-border mb-8">
             <p>No upcoming appointments.</p>
             <button onClick={() => navigate('/services')} className="btn btn-primary mt-4">Explore Services</button>
           </div>
        ) : (
          <div className="space-y-4 mb-8">
            {upcoming.map(appt => (
              <div key={appt.id} className="profile-card appt-card flex justify-between items-center">
                <div>
                  <h4 className="m-0 text-brown">{appt.serviceName}</h4>
                  <p className="text-sm text-gray-600">for {appt.petName}</p>
                  <p className="text-sm font-bold mt-2 text-olive">{appt.date} at {appt.time}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sage text-brown mb-2">CONFIRMED</span>
                  <br/>
                  <button onClick={() => handleCancelAppt(appt.id)} className="text-sm text-error underline hover:text-red-700">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="mb-4 text-lg">History</h3>
        {past.length === 0 ? <p className="text-gray-500 text-sm">No appointment history.</p> : (
           <div className="space-y-4">
           {past.map(appt => (
             <div key={appt.id} className="profile-card appt-card history flex justify-between items-center">
               <div>
                 <h4 className="m-0 text-gray-700">{appt.serviceName}</h4>
                 <p className="text-sm text-gray-500">for {appt.petName} • {appt.date}</p>
               </div>
               <div>
                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                   {appt.status.toUpperCase()}
                 </span>
               </div>
             </div>
           ))}
         </div>
        )}
      </div>
    );
  };

  const renderProfileDetails = () => (
    <div className="profile-card">
      <div className="profile-card-header flex justify-between items-center">
        <h2>Account Information</h2>
        {!isEditing && (
          <button className="btn btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>

      {message && <div className="alert-success">{message}</div>}

      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="profile-form">
          <div className="input-group">
            <label className="input-label" htmlFor="profile-name">Full Name</label>
            <input type="text" id="profile-name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="profile-email">Email Address</label>
            <input type="email" id="profile-email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex gap-1 mt-4">
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-outline" onClick={() => { setIsEditing(false); setName(user.name); setEmail(user.email); }}>Cancel</button>
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
        </div>
      )}
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-header-bg"></div>
      
      <div className="container profile-container">
        <aside className="profile-sidebar">
          <div className="profile-user-card text-center mb-8">
            <div className="profile-avatar mx-auto mb-4 bg-white shadow-sm">
              <User size={32} />
            </div>
            <h2 className="text-xl m-0">{user.name}</h2>
          </div>
          
          <nav className="profile-nav">
            <button className={`profile-nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><Star size={18} /> Overview</button>
            <button className={`profile-nav-link ${activeTab === 'pets' ? 'active' : ''}`} onClick={() => setActiveTab('pets')}><PawPrint size={18} /> My Pets</button>
            <button className={`profile-nav-link ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}><Calendar size={18} /> Appointments</button>
            <button className={`profile-nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><User size={18} /> Profile Details</button>
            <button className={`profile-nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><Package size={18} /> Order History</button>
            <button className={`profile-nav-link text-error`} onClick={handleLogout}><LogOut size={18} /> Sign Out</button>
          </nav>
        </aside>

        <main className="profile-content flex-1">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'profile' && renderProfileDetails()}
          {activeTab === 'pets' && renderPets()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'orders' && <div className="bg-white p-8 rounded-lg text-center"><p>Order history will appear here.</p></div>}
        </main>
      </div>
    </div>
  );
};

export default Profile;
