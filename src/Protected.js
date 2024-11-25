import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  var role=location.state.id;

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
        console.log(token)
        console.log(role)
      try {
        var response='';
        if(role=="user"){
          response = await fetch(`https://fastapi-backend-x9p9.onrender.com/verify-token/${token}`);
        }else{
          response = await fetch(`https://fastapi-backend-x9p9.onrender.com/verify-token/${token}`);
        }
        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        if(role=='admin'){
           navigate('/mainview',{state:{id:role}});
        }else{
           navigate('/userview',{state:{id:role}});
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return <div>This is a protected page. Only visible to authenticated users.</div>;
}

export default ProtectedPage;
