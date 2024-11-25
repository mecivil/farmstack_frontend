import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Navigate } from "react-router-dom";
function Choice(){
    const [loading, setLoading] = useState(false);
    const [sloading, setLoadings] = useState(false);
    const navigate = useNavigate();

      const goToNewPage=(params)=>{
        navigate(`/login`,{state:{id:params}});
      }
return(
    <div className="App list-group-item justify-content center align-items-center mx-auto" style={{'vw':'1100px', "backgroundColor": "white","marginTop":"255px"}}>
        <div>
        <button type="button" class="mx-auto" disabled={loading} onClick={() => goToNewPage('admin')} style={{'borderRadius':'50px','fontWeight':"bold"}}>
          {loading ? 'Redirecting...' : 'Admin'}
        </button>
        <button type="button"  disabled={sloading} onClick={() => goToNewPage('user')} style={{'marginLeft':'25px','borderRadius':'50px','fontWeight':"bold"}}>
          {sloading ? 'Redirecting...' : 'User'}
        </button>
        </div>
    </div>
);
}
export default Choice