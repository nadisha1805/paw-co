import { Link } from 'react-router-dom';
import founderImg from '../assets/founder.png';

const About = () => {
  return (
    <div>
      <section style={{ backgroundColor: 'var(--color-warm-peach)', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Our Story</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
            Paw & Co. was born from a simple belief: our pets deserve the same thoughtful care, quality ingredients, and beautiful design that we seek for ourselves.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 sm-grid-cols-1 gap-4 items-center">
            <div style={{ position: 'relative', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
              <div className="organic-bg" style={{ position: 'absolute', top: '5%', left: '-5%', width: '100%', height: '100%', backgroundColor: 'var(--color-sage)', zIndex: -1, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
              <img 
                src={founderImg} 

                alt="Founder with dog" 
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '8px solid var(--color-white)', 
                  boxShadow: 'var(--shadow-md)', 
                  transform: 'rotate(-2deg)' 
                }}
              />
            </div>
            
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Made for happy tails</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                When we started looking for premium treats and accessories for our own pets, we found a market filled with artificial ingredients, generic designs, and a lack of transparency.
              </p>
              <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9 }}>
                We decided to create something better. Everything at Paw & Co. is designed in-house, sourced responsibly, and rigorously tested by our own four-legged team members.
              </p>
              <Link to="/shop" className="btn btn-primary">Shop Our Collection</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
