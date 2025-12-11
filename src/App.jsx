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
import CalendarProvider from './contexts/Calendarcontext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TwoMonthCalendar from './contexts/Calendarcontext'
import Recentcar from './pages/Recentcar'
import DataProvider from './contexts/Datacontext'
import Footer from './common/Footer'
<<<<<<< HEAD
// 
=======
import RentalCalendar from './pages/Calendar'

>>>>>>> 4e6acddf89a793ab0f41d1ef4993dbe60423dd10
function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <CalendarProvider>
        <BrowserRouter>
          <Header/>
          <TwoMonthCalendar/>
          <RentalCalendar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/guide" element={<GuidePage/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/joinA" element={<JoinFormA/>}/>
            <Route path="/joinB" element={<JoinFormB/>}/>
            <Route path="/joinC" element={<JoinFormC/>}/>
            
          </Routes>
          <Recentcar/>
        </BrowserRouter>
        </CalendarProvider>
      </DataProvider>
    </AuthProvider>
  )
}
export default App