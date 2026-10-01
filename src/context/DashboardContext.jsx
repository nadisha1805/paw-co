import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pawPoints, setPawPoints] = useState(0);

  useEffect(() => {
    if (user) {
      const savedPets = localStorage.getItem(`paw_pets_${user.id}`);
      if (savedPets) setPets(JSON.parse(savedPets));

      const savedAppointments = localStorage.getItem(`paw_appointments_${user.id}`);
      if (savedAppointments) setAppointments(JSON.parse(savedAppointments));

      const savedOrders = localStorage.getItem(`paw_orders_${user.id}`);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedSubscriptions = localStorage.getItem(`paw_subscriptions_${user.id}`);
      if (savedSubscriptions) setSubscriptions(JSON.parse(savedSubscriptions));

      const savedNotifications = localStorage.getItem(`paw_notifications_${user.id}`);
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

      const savedPoints = localStorage.getItem(`paw_points_${user.id}`);
      if (savedPoints) setPawPoints(JSON.parse(savedPoints));
    } else {
      setPets([]);
      setAppointments([]);
      setOrders([]);
      setSubscriptions([]);
      setNotifications([]);
      setPawPoints(0);
    }
  }, [user]);

  const saveState = (key, data, setter) => {
    setter(data);
    if (user) localStorage.setItem(`paw_${key}_${user.id}`, JSON.stringify(data));
  };

  const addPet = (pet) => saveState('pets', [...pets, { ...pet, id: Date.now().toString() }], setPets);
  const editPet = (updatedPet) => saveState('pets', pets.map(p => p.id === updatedPet.id ? updatedPet : p), setPets);
  const deletePet = (petId) => saveState('pets', pets.filter(p => p.id !== petId), setPets);

  const addNotification = (title, message) => {
    const newNotif = { id: Date.now().toString(), title, message, date: new Date().toISOString(), read: false };
    saveState('notifications', [newNotif, ...notifications], setNotifications);
  };

  const markNotificationRead = (id) => saveState('notifications', notifications.map(n => n.id === id ? { ...n, read: true } : n), setNotifications);
  const markAllNotificationsRead = () => saveState('notifications', notifications.map(n => ({ ...n, read: true })), setNotifications);

  const bookAppointment = (appointment) => {
    const newAppt = { ...appointment, id: Date.now().toString(), status: 'Confirmed', bookingDate: new Date().toISOString() };
    saveState('appointments', [...appointments, newAppt], setAppointments);
    addNotification('Appointment Confirmed', `Your appointment for ${newAppt.serviceName} is confirmed for ${newAppt.date} at ${newAppt.time}.`);
    return newAppt;
  };

  const cancelAppointment = (appointmentId) => {
    saveState('appointments', appointments.map(a => a.id === appointmentId ? { ...a, status: 'Cancelled' } : a), setAppointments);
    addNotification('Appointment Cancelled', 'Your appointment has been successfully cancelled.');
  };

  const addOrder = (order) => {
    const newOrder = { 
      ...order, 
      id: `PAW-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Date.now().toString().slice(-4)}`,
      status: 'Confirmed',
      orderDate: new Date().toISOString()
    };
    saveState('orders', [newOrder, ...orders], setOrders);
    
    // Add paw points
    const earnedPoints = Math.floor(order.total);
    saveState('points', pawPoints + earnedPoints, setPawPoints);
    
    addNotification('Order Confirmed', `Your order #${newOrder.id} has been confirmed. You earned ${earnedPoints} Paw Points!`);
    return newOrder;
  };

  const usePawPoints = (amount) => {
    if (pawPoints >= amount) {
      saveState('points', pawPoints - amount, setPawPoints);
      return true;
    }
    return false;
  };

  const addSubscription = (sub) => {
    const newSub = { ...sub, id: Date.now().toString(), status: 'Active', startDate: new Date().toISOString() };
    saveState('subscriptions', [newSub, ...subscriptions], setSubscriptions);
    addNotification('Subscription Confirmed', `You have successfully subscribed to ${newSub.name}!`);
    return newSub;
  };

  const cancelSubscription = (subId) => {
    saveState('subscriptions', subscriptions.map(s => s.id === subId ? { ...s, status: 'Cancelled' } : s), setSubscriptions);
    addNotification('Subscription Cancelled', 'Your subscription has been cancelled.');
  };

  return (
    <DashboardContext.Provider value={{
      pets, addPet, editPet, deletePet,
      appointments, bookAppointment, cancelAppointment,
      orders, addOrder,
      subscriptions, addSubscription, cancelSubscription,
      notifications, addNotification, markNotificationRead, markAllNotificationsRead,
      pawPoints, usePawPoints
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
