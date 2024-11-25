import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
function Login({route,navigator}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sloading, setLoadings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  var role=location.state.id;

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSignUp = async (event) =>{
    event.preventDefault();
    if (!validateForm()) return;
    setLoadings(true);
      axios.post("https://fastapi-backend-x9p9.onrender.com/sign_up", {'username' : username ,'password' : password}).then(res => { setLoadings(false);alert('You signed up successfully')}).catch(function (error) {
      if (error.response) {
        setLoadings(false);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return alert("User already exists.Try logging in or try signing up with a different username.")
      }
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      var response='';
      if(role=="user"){
      response = await fetch('https://fastapi-backend-x9p9.onrender.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });
    }else{
      response = await fetch('https://fastapi-backend-x9p9.onrender.com/token_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });
    }

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected',{state:{id:role}});
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed! Sign up first');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="App list-group-item justify-content center align-items-center mx-auto" style={{'vw':'1100px', "backgroundColor": "white","marginTop":"255px"}}>
      <form onSubmit={handleSubmit}>
        <div><p>For doubts related to admin rights please visit <a href="https://github.com/mecivil/farmstack_frontend">Owner Website</a></p></div>
        <div>
          <input
            class="mb-3 col-sm-2 col-form-label"
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            class="mb-3 col-sm-2 col-form-label"
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="mx-auto" disabled={loading} style={{'borderRadius':'50px','fontWeight':"bold"}}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button type="button"  disabled={sloading || role=="admin"} onClick={handleSignUp} style={{'marginLeft':'25px','borderRadius':'50px','fontWeight':"bold"}}>
          {sloading ? 'Signing up...' : 'Sign up'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
