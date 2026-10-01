import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      const savedPets = localStorage.getItem(`paw_pets_${user.id}`);
      if (savedPets) setPets(JSON.parse(savedPets));

      const savedAppointments = localStorage.getItem(`paw_appointments_${user.id}`);
      if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
    } else {
      setPets([]);
      setAppointments([]);
    }
  }, [user]);

  const savePets = (newPets) => {
    setPets(newPets);
    if (user) localStorage.setItem(`paw_pets_${user.id}`, JSON.stringify(newPets));
  };

  const saveAppointments = (newAppointments) => {
    setAppointments(newAppointments);
    if (user) localStorage.setItem(`paw_appointments_${user.id}`, JSON.stringify(newAppointments));
  };

  const addPet = (pet) => {
    const newPet = { ...pet, id: Date.now().toString() };
    savePets([...pets, newPet]);
  };

  const editPet = (updatedPet) => {
    savePets(pets.map(p => p.id === updatedPet.id ? updatedPet : p));
  };

  const deletePet = (petId) => {
    savePets(pets.filter(p => p.id !== petId));
  };

  const bookAppointment = (appointment) => {
    const newAppt = { ...appointment, id: Date.now().toString(), status: 'Confirmed', bookingDate: new Date().toISOString() };
    saveAppointments([...appointments, newAppt]);
    return newAppt;
  };

  const cancelAppointment = (appointmentId) => {
    saveAppointments(appointments.map(a => a.id === appointmentId ? { ...a, status: 'Cancelled' } : a));
  };

  return (
    <DashboardContext.Provider value={{
      pets, addPet, editPet, deletePet,
      appointments, bookAppointment, cancelAppointment
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
