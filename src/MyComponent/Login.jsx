import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch('https://z2l7gq-8000.csb.app/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('failed with data: ', data)
        setError(data.message);
        return;
      }

      // Redirect to another page on successful login
      navigate('/table')
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div className="containers">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <input type="Password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="error">{error}</div>} {/* Display error message */}
        <div className="forget">Register User? <Link to={'/'}>Sign Up</Link></div>
        <button className="submit-container" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;