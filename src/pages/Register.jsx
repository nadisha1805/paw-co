import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container reverse">
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <h1 className="auth-title">Join the pack</h1>
            <p className="auth-subtitle">Create an account to save your favorite products and checkout faster.</p>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label className="input-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="input-field" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">Email address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="input-field" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="input-group">
                <label className="input-label" htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="input-field" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  minLength="6"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
        
        <div className="auth-image-side organic-bg-subtle-alt">
          <img 
            src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1000&auto=format&fit=crop" 
            alt="Cute cat" 
            className="auth-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
