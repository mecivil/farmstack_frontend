import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ProtectedPage from './Protected';
import MainView from './MainView';
import Choice from './Choice';
import UserView from './Userview';
function App() {
  return (
    <Router>
      <Routes>
      { <Route path="/" element={<Choice />} /> }
      {<Route path="/login" element={<Login />} /> }
      { <Route path="/protected" element={<ProtectedPage />} />}
      {<Route path="/mainview" element={<MainView />} /> }
      {<Route path="/userview" element={<UserView />} /> }
      </Routes>
    </Router>
  );
}
export default App;

