import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { LogOut, User, Settings, Package, Heart, Calendar, PawPrint, Trash2, Edit2, Plus, Star, Gift, Bell, CheckCircle2 } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { 
    pets, addPet, editPet, deletePet, 
    appointments, cancelAppointment,
    orders, subscriptions, cancelSubscription,
    pawPoints, notifications, markNotificationRead
  } = useDashboard();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, profile, pets, appointments, orders, subscriptions, points, notifications
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
        <div className="grid md-grid-cols-3 gap-4">
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
                <p className="font-bold">{upcomingAppts[0].serviceName}</p>
                <p className="text-sm">{upcomingAppts[0].date}</p>
              </div>
            ) : (
              <p>No upcoming appointments.</p>
            )}
             <button className="btn btn-outline mt-4 text-sm" onClick={() => setActiveTab('appointments')}>View All</button>
          </div>

          <div className="dashboard-card bg-white border border-border">
            <h3 className="flex items-center gap-2 mb-4 text-terracotta"><Gift size={20} /> Paw Points</h3>
            <p className="text-3xl font-bold text-brown mb-2">{pawPoints}</p>
            <p className="text-sm text-gray-500 mb-4">Points available</p>
             <button className="btn btn-primary w-full text-sm" onClick={() => setActiveTab('points')}>Redeem Rewards</button>
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
           <div className="text-center py-8 bg-gray-50 rounded-lg border-dashed border-2 border-border mb-8">
             <p className="mb-4">No upcoming appointments.</p>
             <button onClick={() => navigate('/services')} className="btn btn-primary">Explore Services</button>
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

  const renderOrders = () => (
    <div className="dashboard-orders profile-card">
      <h2 className="mb-6 border-b border-border pb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-dashed border-2 border-border">
          <Package size={48} className="mx-auto mb-4" style={{color: 'var(--color-sage)'}} />
          <h3 className="mb-2">No orders yet</h3>
          <p className="mb-4 text-gray-500">Your pet's shopping adventure starts here.</p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">Explore Products</button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h4 className="m-0 text-brown">Order #{order.id}</h4>
                  <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-terracotta">${order.total.toFixed(2)}</span>
                  <br/>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sage text-brown mt-1">CONFIRMED</span>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 w-16 text-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mb-1" />
                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSubscriptions = () => (
    <div className="dashboard-subscriptions profile-card">
      <h2 className="mb-6 border-b border-border pb-4">My Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-dashed border-2 border-border">
          <Heart size={48} className="mx-auto mb-4" style={{color: 'var(--color-sage)'}} />
          <h3 className="mb-2">No active subscriptions</h3>
          <p className="mb-4 text-gray-500">You don't have an active Paw Box yet.</p>
          <button onClick={() => navigate('/subscriptions')} className="btn btn-primary">Explore Paw Boxes</button>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map(sub => (
            <div key={sub.id} className="bg-white p-6 rounded-lg shadow-sm border border-border flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <img src={sub.image} alt={sub.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h4 className="m-0 text-brown">{sub.name}</h4>
                  <p className="text-sm text-gray-500">{sub.frequency} • ${sub.price}</p>
                  <p className="text-xs mt-1">Started: {new Date(sub.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${sub.status === 'Active' ? 'bg-sage text-brown' : 'bg-gray-200 text-gray-600'}`}>
                   {sub.status.toUpperCase()}
                 </span>
                 <br/>
                 {sub.status === 'Active' && (
                   <button 
                     onClick={() => {
                       if(window.confirm("Are you sure you want to cancel this subscription?")) {
                         cancelSubscription(sub.id);
                       }
                     }} 
                     className="text-sm text-error underline hover:text-red-700"
                   >
                     Cancel
                   </button>
                 )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPoints = () => (
    <div className="dashboard-points profile-card text-center py-12">
      <div className="w-24 h-24 bg-warm-peach rounded-full flex items-center justify-center mx-auto mb-6 text-terracotta shadow-sm">
        <Gift size={48} />
      </div>
      <h2 className="mb-2">Your Paw Points</h2>
      <p className="text-5xl font-bold text-brown mb-4">{pawPoints}</p>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">Earn 1 Paw Point for every dollar spent. Redeem points for discounts during checkout!</p>

      <div className="grid sm-grid-cols-3 gap-4 text-left">
        <div className="bg-white p-4 rounded-lg border border-border">
          <h4 className="text-lg mb-1">100 Points</h4>
          <p className="text-terracotta font-bold">$5 OFF</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-border">
          <h4 className="text-lg mb-1">250 Points</h4>
          <p className="text-terracotta font-bold">$15 OFF</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-border">
          <h4 className="text-lg mb-1">500 Points</h4>
          <p className="text-terracotta font-bold">$35 OFF</p>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => {
    const unreadCount = notifications.filter(n => !n.read).length;
    return (
      <div className="dashboard-notifications profile-card">
        <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
          <h2 className="m-0 flex items-center gap-2">Notifications {unreadCount > 0 && <span className="bg-terracotta text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>}</h2>
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">You're all caught up 🐾</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notif => (
              <div 
                key={notif.id} 
                className={`p-4 rounded-lg border ${notif.read ? 'bg-white border-gray-100 opacity-75' : 'bg-warm-peach border-border shadow-sm'} cursor-pointer`}
                onClick={() => { if(!notif.read) markNotificationRead(notif.id); }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`m-0 ${!notif.read ? 'text-terracotta' : 'text-gray-700'}`}>{notif.title}</h4>
                  <span className="text-xs text-gray-500">{new Date(notif.date).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-700 m-0">{notif.message}</p>
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
            <button className={`profile-nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><Package size={18} /> Order History</button>
            <button className={`profile-nav-link ${activeTab === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveTab('subscriptions')}><Heart size={18} /> Subscriptions</button>
            <button className={`profile-nav-link ${activeTab === 'pets' ? 'active' : ''}`} onClick={() => setActiveTab('pets')}><PawPrint size={18} /> My Pets</button>
            <button className={`profile-nav-link ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}><Calendar size={18} /> Appointments</button>
            <button className={`profile-nav-link ${activeTab === 'points' ? 'active' : ''}`} onClick={() => setActiveTab('points')}><Gift size={18} /> Paw Points</button>
            <button className={`profile-nav-link ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
               <Bell size={18} /> Notifications 
               {notifications.filter(n => !n.read).length > 0 && <span className="bg-terracotta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-auto">{notifications.filter(n => !n.read).length}</span>}
            </button>
            <button className={`profile-nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><User size={18} /> Profile Details</button>
            <button className={`profile-nav-link text-error`} onClick={handleLogout}><LogOut size={18} /> Sign Out</button>
          </nav>
        </aside>

        <main className="profile-content flex-1">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'subscriptions' && renderSubscriptions()}
          {activeTab === 'pets' && renderPets()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'points' && renderPoints()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'profile' && renderProfileDetails()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
