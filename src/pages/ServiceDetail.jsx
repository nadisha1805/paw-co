import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import { Clock, DollarSign, CheckCircle2, ChevronLeft, Calendar, Star } from 'lucide-react';
import './ServiceDetail.css';

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pets, appointments, bookAppointment } = useDashboard();
  
  const [service, setService] = useState(null);
  const [step, setStep] = useState('DETAILS'); // DETAILS, PET, DATE_TIME, REVIEW, CONFIRMATION
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedApptId, setBookedApptId] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const found = services.find(s => s.id === parseInt(id));
    if (found) setService(found);
  }, [id]);

  if (!service) return <div className="container py-16 text-center">Loading...</div>;

  const getAvailableSlots = (date) => {
    // Check existing appointments
    const bookedOnDate = appointments.filter(a => 
      a.serviceId === service.id && 
      a.date === date && 
      a.status !== 'Cancelled'
    );
    const bookedTimes = bookedOnDate.map(a => a.time);
    return timeSlots.filter(t => !bookedTimes.includes(t));
  };

  const handleStartBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setStep('PET');
  };

  const handleConfirm = () => {
    const newAppt = bookAppointment({
      serviceId: service.id,
      serviceName: service.name,
      serviceImage: service.image,
      petId: selectedPet.id,
      petName: selectedPet.name,
      petBreed: selectedPet.breed,
      date: selectedDate,
      time: selectedTime,
      price: service.price,
      duration: service.duration
    });
    setBookedApptId(newAppt.id);
    setStep('CONFIRMATION');
  };

  const submitReview = (e) => {
    e.preventDefault();
    if(reviewText.trim() === '') return;
    const newReview = { id: Date.now(), author: user.name, rating: reviewRating, text: reviewText, date: new Date().toISOString().split('T')[0] };
    service.reviews = [newReview, ...(service.reviews || [])];
    setReviewText('');
    setReviewRating(5);
  };

  const renderDetails = () => (
    <div className="service-detail-grid">
      <div className="service-detail-img">
        <img src={service.image} alt={service.name} />
      </div>
      <div className="service-detail-info">
        <button onClick={() => navigate('/services')} className="back-link"><ChevronLeft size={16} /> Back to Services</button>
        <h1 className="mt-4">{service.name}</h1>
        <div className="service-price-time flex gap-4 mt-2 mb-6">
          <span className="flex items-center gap-1 text-terracotta font-bold text-xl"><DollarSign size={20} /> {service.price}</span>
          <span className="flex items-center gap-1 text-olive text-lg"><Clock size={18} /> {service.duration}</span>
        </div>
        <p className="service-desc">{service.description}</p>
        
        <div className="service-includes mt-6">
          <h3>What's Included</h3>
          <ul>
            {service.includes.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-sage" /> {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="service-notes mt-6">
          <strong>Important Notes:</strong> {service.notes}
        </div>

        <button onClick={handleStartBooking} className="btn btn-primary w-full mt-8 py-3 text-lg">
          Book Appointment
        </button>
      </div>

      <div className="service-reviews-section mt-12 w-full col-span-full">
         <h2>Customer Reviews</h2>
         <div className="reviews-list mt-6">
           {service.reviews && service.reviews.length > 0 ? service.reviews.map(review => (
             <div key={review.id} className="review-card">
               <div className="flex justify-between">
                 <strong>{review.author}</strong>
                 <span className="text-sm text-gray-500">{review.date}</span>
               </div>
               <div className="flex text-yellow-400 my-1">
                 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />)}
               </div>
               <p>{review.text}</p>
             </div>
           )) : <p>No reviews yet. Be the first to share your experience!</p>}
         </div>

         {user && (
           <form onSubmit={submitReview} className="mt-8 review-form bg-cream p-6 rounded-lg">
             <h3>Leave a Review</h3>
             <div className="flex gap-2 my-2">
                {[1,2,3,4,5].map(star => (
                  <button type="button" key={star} onClick={() => setReviewRating(star)} className={`text-${star <= reviewRating ? 'yellow' : 'gray'}-500`}>
                    <Star size={24} fill={star <= reviewRating ? "currentColor" : "none"} />
                  </button>
                ))}
             </div>
             <textarea className="input-field w-full mt-2" rows="4" placeholder="Share your experience..." value={reviewText} onChange={e => setReviewText(e.target.value)} required></textarea>
             <button type="submit" className="btn btn-secondary mt-4">Submit Review</button>
           </form>
         )}
      </div>
    </div>
  );

  const renderPetSelection = () => (
    <div className="booking-step">
      <button onClick={() => setStep('DETAILS')} className="back-link"><ChevronLeft size={16} /> Back</button>
      <h2 className="mt-6 mb-2 text-center">Who is this appointment for?</h2>
      <p className="text-center mb-8 text-gray-600">Select which of your furry friends needs pampering.</p>
      
      {pets.length === 0 ? (
        <div className="empty-state text-center py-12 bg-white rounded-lg border-dashed border-2 border-border">
          <h3 className="mb-2">Your pack is missing someone.</h3>
          <p className="mb-6">Add your first furry friend to get started.</p>
          <button onClick={() => navigate('/profile')} className="btn btn-primary">+ Add Pet in Profile</button>
        </div>
      ) : (
        <div className="grid sm-grid-cols-2 gap-4 max-w-2xl mx-auto">
          {pets.map(pet => (
            <div 
              key={pet.id} 
              className={`pet-select-card ${selectedPet?.id === pet.id ? 'selected' : ''}`}
              onClick={() => setSelectedPet(pet)}
            >
              <h4>{pet.name}</h4>
              <p>{pet.breed} ({pet.type})</p>
            </div>
          ))}
          <div className="flex justify-center mt-6 w-full" style={{ gridColumn: '1 / -1' }}>
            <button 
              type="button"
              className={`btn ${selectedPet ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
              onClick={(e) => {
                e.preventDefault();
                if (selectedPet) {
                  setStep('DATE_TIME');
                } else {
                  alert("Please select a pet for the appointment.");
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderDateTime = () => {
    // Basic date picker for demo (prevent past dates by setting min to today)
    const today = new Date().toISOString().split('T')[0];
    const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

    return (
      <div className="booking-step max-w-2xl mx-auto">
        <button onClick={() => setStep('PET')} className="back-link"><ChevronLeft size={16} /> Back to Pets</button>
        <h2 className="mt-6 mb-8 text-center">Select Date & Time</h2>
        
        <div className="input-group">
          <label className="input-label font-bold text-lg"><Calendar size={20} className="inline mr-2"/>Choose a Date</label>
          <input 
            type="date" 
            min={today}
            className="input-field p-4 text-lg"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedTime(''); // reset time when date changes
            }}
          />
        </div>

        {selectedDate && (
          <div className="mt-8">
            <h3 className="mb-4">Available Times</h3>
            <div className="grid grid-cols-3 sm-grid-cols-4 gap-3">
              {timeSlots.map(time => {
                const isAvailable = availableSlots.includes(time);
                return (
                  <button
                    key={time}
                    disabled={!isAvailable}
                    className={`time-slot-btn ${selectedTime === time ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button 
            className="btn btn-primary px-12"
            disabled={!selectedDate || !selectedTime}
            onClick={() => setStep('REVIEW')}
          >
            Review Appointment
          </button>
        </div>
      </div>
    );
  };

  const renderReview = () => (
    <div className="booking-step max-w-xl mx-auto">
      <button onClick={() => setStep('DATE_TIME')} className="back-link"><ChevronLeft size={16} /> Back to Date & Time</button>
      <h2 className="mt-6 mb-8 text-center">Review Your Appointment</h2>
      
      <div className="review-box bg-white p-6 rounded-lg shadow-md border border-border">
        <div className="review-row flex justify-between border-b border-gray-100 py-3">
          <span className="font-bold text-olive">SERVICE</span>
          <span className="text-right">{service.name}</span>
        </div>
        <div className="review-row flex justify-between border-b border-gray-100 py-3">
          <span className="font-bold text-olive">PET</span>
          <span className="text-right">{selectedPet?.name}<br/><small className="text-gray-500">{selectedPet?.breed}</small></span>
        </div>
        <div className="review-row flex justify-between border-b border-gray-100 py-3">
          <span className="font-bold text-olive">DATE</span>
          <span className="text-right">{selectedDate}</span>
        </div>
        <div className="review-row flex justify-between border-b border-gray-100 py-3">
          <span className="font-bold text-olive">TIME</span>
          <span className="text-right">{selectedTime}</span>
        </div>
        <div className="review-row flex justify-between border-b border-gray-100 py-3">
          <span className="font-bold text-olive">DURATION</span>
          <span className="text-right">{service.duration}</span>
        </div>
        <div className="review-row flex justify-between py-3 text-lg font-bold">
          <span className="text-terracotta">TOTAL PRICE</span>
          <span>${service.price}</span>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="btn btn-primary px-12 py-3 text-lg" onClick={handleConfirm}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="booking-step text-center py-12 max-w-xl mx-auto">
      <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center mx-auto mb-6 text-white">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="mb-2 text-terracotta">Appointment Booked!</h1>
      <p className="text-lg mb-8">We can't wait to pamper {selectedPet?.name}.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border mb-8 text-left">
        <p><strong>Appointment ID:</strong> #{bookedApptId}</p>
        <p><strong>Status:</strong> <span className="text-success font-bold">CONFIRMED</span></p>
        <p><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</p>
      </div>

      <div className="flex gap-4 justify-center">
        <button className="btn btn-primary" onClick={() => navigate('/profile')}>View My Appointments</button>
        <button className="btn btn-outline" onClick={() => navigate('/services')}>Back to Services</button>
      </div>
    </div>
  );

  return (
    <div className="service-detail-page bg-cream min-h-screen py-12">
      <div className="container">
        {step === 'DETAILS' && renderDetails()}
        {step === 'PET' && renderPetSelection()}
        {step === 'DATE_TIME' && renderDateTime()}
        {step === 'REVIEW' && renderReview()}
        {step === 'CONFIRMATION' && renderConfirmation()}
      </div>
    </div>
  );
};

export default ServiceDetail;
