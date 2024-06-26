import './App.css';
import React , {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import TodoView  from './components/TodoListView.js';
function MainView() {
  const [todoList,setTodoList] = useState([{}])
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const validateForm = () => {
    if (!title || !desc) {
      setError('Title and Description are required');
      return false;
    }
    setError('');
    return true;
  };
  //Read all todos
  useEffect(()=>{
    axios.get('https://fastapi-backend-x9p9.onrender.com/api/todo').then(res => {
      setTodoList(res.data)
    })
  });
   //Logout Handler
   const LogoutHandler=()=>{
    localStorage.removeItem('token');
    navigate('/protected');
   };
  //Post a todo
   const addTodoHandler = () => {
    if (!validateForm()) return;
      axios.post("https://fastapi-backend-x9p9.onrender.com/api/todo", {'title' : title ,'description' : desc}).then(res => {setError("");console.log(res)}).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return alert("You are not allowed to add a document with the given title as it is already there.Try update instead.")
        }
      })
  };
  //Update a todo
  
  const updateTodoHandler= async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://fastapi-backend-x9p9.onrender.com/api/todo/', {
        method: 'PUT',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify({'title' : title ,'description' : desc})
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Updated successfully with Title : ${title} Description:${desc}`)
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Document does not exist.Click on Add Task.');
      }
    } catch (error) {
      setError('An error occurred.Document does not exist.Try clicking on Add Task.If it fails try again later.');
    }
  };

  
  return (
     <div className="App list-group-item justify-content center align-items-center mx-auto" style={{'width':'400px', "backgroundColor": "white","marginTop":"15px"}}>
      <h1 className='card text-white bg-primary mb-1' stylename="max-width:20rem;">
        Task Manager
      </h1>
      <h6 className='card text-white bg-primary mb-3'>FASTAPI - React - MongoDB</h6>
      <div className='card-body'>
        <h5 className='card text-white bg-dark mb-3'>Add Your Task</h5>
        <span className='card-text'>
          <input className='mb-2 form-control titleIn' onChange={event => setTitle(event.target.value)} placeholder='Title' />
          <input className='mb-2 form-control desIn' onChange={event => setDesc(event.target.value)} placeholder='Description'/>
          <button className='btn btn-outline-primary mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':"bold"}} onClick={addTodoHandler}>Add Task</button>
          <button className='btn btn-outline-primary mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':"bold"}} onClick={updateTodoHandler}>Update Task</button>
          <Button variant="danger" className='btn text-white btn-outline-primary mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':"bold"}} color='red' onClick={LogoutHandler}>Logout</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </span>
        <h5 className='card text-white bg-dark mb-3'>Your Tasks</h5>
        <div>
         <TodoView todoList={todoList} />
        </div>
      </div>
      <h6 className='card text-dark bg-warning py-1 mb-0'>Copyright 2024 , All rights reserved &copy;</h6>
     </div>
  );
}

export default MainView;
