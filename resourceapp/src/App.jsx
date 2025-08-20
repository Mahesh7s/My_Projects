import { useState } from 'react';
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/about';
import Register from './Pages/register';
import Navbar from './components/navbar';
import { Login } from './Pages/login';
import PrivateRoute from './components/privateRoute';
import Dashboard from './Pages/dashboard';


function App() {
  return (
    <>
      <h1>Welcome to Landing Page</h1>
      <Navbar/>
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      </Routes>
     
    </>
  );
}

export default App;
