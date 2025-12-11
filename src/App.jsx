// import { useState } from 'react'
import './App.css'
import Header from './common/Header'
import Home from './pages/Home'
import LoginForm from './common/LoginForm'
import JoinFormA from './pages/Join/JoinFormA'
import JoinFormB from './pages/Join/JoinFormB'
import JoinFormC from './pages/Join/JoinFormC'
import AuthProvider from './contexts/Authcontext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/joinA" element={<JoinFormA/>}/>
          <Route path="/joinB" element={<JoinFormB/>}/>
          <Route path="/joinC" element={<JoinFormC/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
