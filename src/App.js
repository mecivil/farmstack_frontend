import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ProtectedPage from './Protected';
import MainView from './MainView';
function App() {
  return (
    <Router>
      <Routes>
      { <Route path="/" element={<Login />} /> }
      { <Route path="/protected" element={<ProtectedPage />} />}
      {<Route path="/mainview" element={<MainView />} /> }
      </Routes>
    </Router>
  );
}
export default App;

