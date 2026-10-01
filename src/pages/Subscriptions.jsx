import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { Check, PackageSearch } from 'lucide-react';
import './Services.css'; // Reuse services CSS since it's similar structurally

const plans = [
  {
    id: 'plan_starter',
    name: 'Starter Paw Box',
    description: 'Monthly pet essentials for the everyday companion.',
    price: 29.99,
    frequency: 'Monthly',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    benefits: ['2 Premium Toys', '1 Bag of Natural Treats', 'Essential grooming item', 'Free Shipping']
  },
  {
    id: 'plan_happy',
    name: 'Happy Paw Box',
    description: 'Monthly curated treats and essentials for a very happy pet.',
    price: 49.99,
    frequency: 'Monthly',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    benefits: ['3 Premium Toys', '2 Bags of Natural Treats', 'Grooming Essentials', 'Access to exclusive items', 'Free Shipping']
  },
  {
    id: 'plan_premium',
    name: 'Premium Paw Box',
    description: 'The ultimate monthly pampering package for your furry royalty.',
    price: 89.99,
    frequency: 'Monthly',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    benefits: ['4 Premium Toys', '3 Bags of Gourmet Treats', 'Luxury Grooming Set', 'Exclusive Apparel', 'Surprise Gift', 'Free VIP Shipping']
  }
];

const Subscriptions = () => {
  const { user } = useAuth();
  const { addSubscription } = useDashboard();
  const navigate = useNavigate();
  const [subscribingTo, setSubscribingTo] = useState(null);

  const handleSubscribe = (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSubscribingTo(plan.id);
    setTimeout(() => {
      addSubscription(plan);
      setSubscribingTo(null);
      navigate('/profile'); // To view the new subscription
    }, 1500);
  };

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container text-center">
          <h1 className="script-text mb-4">Paw Boxes</h1>
          <h2 className="text-4xl text-brown mb-6">Joy Delivered Monthly</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Treat your furry friend to a curated selection of premium toys, treats, and essentials delivered right to your door every month.
          </p>
        </div>
      </div>
      
      <div className="organic-bg-decoration" style={{backgroundColor: 'var(--color-warm-peach)'}}></div>

      <div className="container py-16 relative z-10">
        <div className="grid md-grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="service-card flex flex-col">
              <div className="service-img-wrapper">
                <img src={plan.image} alt={plan.name} className="service-img" />
              </div>
              <div className="service-content flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="m-0 text-2xl">{plan.name}</h3>
                  <span className="font-bold text-terracotta text-xl">${plan.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.frequency}</p>
                <p className="service-short-desc mb-6">{plan.description}</p>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm mb-3">What's Inside:</h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-sage flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="btn btn-primary w-full py-3 flex justify-center items-center gap-2"
                  onClick={() => handleSubscribe(plan)}
                  disabled={subscribingTo === plan.id}
                >
                  {subscribingTo === plan.id ? 'Subscribing...' : <><PackageSearch size={18}/> Subscribe Now</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
