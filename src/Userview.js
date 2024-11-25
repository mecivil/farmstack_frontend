import './App.css';
import React , {useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import TodoView  from './components/TodoListView.js';
import TodoView1 from './components/TodoListView1.js';
function UserView() {
  const location = useLocation();
  var role=location.state.id;
    const navigate=useNavigate();
    const [todoList,setTodoList] = useState([{}])
      //Read all todos
    useEffect(()=>{
        axios.get('https://fastapi-backend-x9p9.onrender.com/api/todo').then(res => {
        setTodoList(res.data)
        })
    });
     //Logout Handler
   const LogoutHandler=()=>{
    localStorage.removeItem('token');
    navigate('/protected',{state:{id:role}});
   };
    return (
        <div className="App list-group-item justify-content center align-items-center mx-auto" style={{'width':'400px', "backgroundColor": "white","marginTop":"15px"}}>
         <h1 className='card text-white bg-primary mb-1' stylename="max-width:20rem;">
           Task Viewer
         </h1>
         <h6 className='card text-white bg-primary mb-3'>FASTAPI - React - MongoDB</h6>
         <div className='card-body'>
           <span className='card-text'>
             <Button variant="danger" className='btn text-white btn-outline-primary mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':"bold"}} color='red' onClick={LogoutHandler}>Logout</Button>
           </span>
           <h5 className='card text-white bg-dark mb-3'>Your Tasks</h5>
           <div>
            <TodoView1 todoList={todoList} />
           </div>
         </div>
         <h6 className='card text-dark bg-warning py-1 mb-0'>Copyright 2024 , All rights reserved &copy;</h6>
        </div>
     );
}
export default UserView;