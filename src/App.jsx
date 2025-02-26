import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing/landing.jsx'
// import Receptor from './Pages/Register/Receptor.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import EditRegisterMagicGirl from './Pages/Resgister-edit/register-edit.jsx'
import History from './Pages/History/history.jsx';

function App() {

  return (
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/profile/:id' element={<Profile />} />
    <Route path='/editar/:id' element={<EditRegisterMagicGirl />} />
    <Route path='/registro' element={<EditRegisterMagicGirl />} />
    <Route path='/history' element={<History />} />
   </Routes>
  );
}

export default App;
