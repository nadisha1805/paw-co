import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container section-padding">
      <div className="text-center" style={{ marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
        <h1>Get in Touch</h1>
        <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>We'd love to hear from you and your furry friend. Reach out to our team with any questions or just to say hello.</p>
      </div>

      <div className="grid grid-cols-2 sm-grid-cols-1 gap-4">
        <div style={{ backgroundColor: 'var(--color-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Send a Message</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label className="input-label">Name</label>
              <input type="text" className="input-field" placeholder="Your name" />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" className="input-field" placeholder="Your email" />
            </div>
            <div className="input-group">
              <label className="input-label">Message</label>
              <textarea className="input-field" rows="5" placeholder="How can we help?"></textarea>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Send Message</button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ backgroundColor: 'var(--color-soft-peach)', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="flex items-center gap-1">
                <Mail size={20} color="var(--color-terracotta)" />
                <span>hello@pawandco.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={20} color="var(--color-terracotta)" />
                <span>1-800-PAW-LOVE</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={20} color="var(--color-terracotta)" />
                <span>123 Pet Lane, Suite 100<br/>San Francisco, CA 94110</span>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--color-sage)', padding: '3rem', borderRadius: 'var(--radius-lg)', flex: 1, position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ position: 'relative', zIndex: 1 }}>Wholesale Inquiries</h3>
            <p style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>Interested in stocking Paw & Co. products in your retail store?</p>
            <Link to="#" className="btn btn-outline" style={{ position: 'relative', zIndex: 1 }}>Apply Now</Link>
            
            <div className="organic-bg" style={{ position: 'absolute', right: '-20%', bottom: '-20%', width: '150px', height: '150px', backgroundColor: 'var(--color-light-green)', zIndex: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
