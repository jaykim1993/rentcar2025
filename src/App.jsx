import { useState } from 'react'
import './App.css'
import GuidePage from './pages/Guide'
import Header from './common/Header'
import Home from './pages/Home'
import LoginForm from './common/LoginForm'
import JoinFormA from './pages/Join/JoinFormA'
import JoinFormB from './pages/Join/JoinFormB'
import JoinFormC from './pages/Join/JoinFormC'
import AuthProvider from './contexts/Authcontext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TwoMonthCalendar from './contexts/Calendercontext'
import Recentcar from './pages/Recentcar'
import DataProvider from './contexts/Datacontext'
import Footer from './common/Footer'
// 
function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <CalenderProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <TwoMonthCalendar/>
            <Route path="/" element={<Home/>}/>
            <Route path="/guide" element={<GuidePage/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/joinA" element={<JoinFormA/>}/>
            <Route path="/joinB" element={<JoinFormB/>}/>
            <Route path="/joinC" element={<JoinFormC/>}/>
            <Recentcar/>
          </Routes>
        </BrowserRouter>
        </CalenderProvider>
      </DataProvider>
    </AuthProvider>
  )
}
export default App
