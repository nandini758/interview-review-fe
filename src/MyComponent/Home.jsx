import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://z2l7gq-8000.csb.app/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('failed with data: ', data)
        setError(data.message);
        return;
      }

      // Redirect to another page on successful login
      navigate('/Login')
    } catch (err) {
      console.error('SignUp failed:', err);
      setError('SignUp failed. Please try again later.');
    }
  };

  return (
    <div className="containers">
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {!showLogin && (
          <div className="input">
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="input">
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="forget" >Already Registered? <Link to={'/Login'}>Login</Link> </div>
          <button className="submit-container">
            <div className="submit" onClick={handleSignUp}>Sign Up</div>
          </button>
        </div>
     
    </div>
  );
}

export default Home;
