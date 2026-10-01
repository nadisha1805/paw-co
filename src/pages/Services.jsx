import { Link } from 'react-router-dom';
import { services } from '../data/services';
import './Services.css';
import { Clock, DollarSign, ChevronRight } from 'lucide-react';

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container text-center">
          <h1 className="script-text mb-4">Pamper Your Pet</h1>
          <h2 className="text-4xl text-brown mb-6">Premium Pet-Care Services</h2>
          <p className="text-lg max-w-2xl mx-auto">
            From luxurious grooming sessions to gentle nail care, our expert team provides
            top-tier services to keep your furry family members happy, healthy, and beautiful.
          </p>
        </div>
      </div>
      
      <div className="organic-bg-decoration"></div>

      <div className="container py-16 relative z-10">
        <div className="grid md-grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-img-wrapper">
                <img src={service.image} alt={service.name} className="service-img" />
              </div>
              <div className="service-content">
                <h3>{service.name}</h3>
                <p className="service-short-desc">{service.shortDescription}</p>
                <div className="service-meta">
                  <span className="flex items-center gap-1"><DollarSign size={16} /> Starts at ${service.price}</span>
                  <span className="flex items-center gap-1"><Clock size={16} /> {service.duration}</span>
                </div>
                <Link to={`/services/${service.id}`} className="btn btn-primary w-full flex justify-center mt-4">
                  View Details <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
