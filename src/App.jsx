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
import Searchcarlist  from './pages/Searchcarlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DataProvider from './contexts/Datacontext'
import Footer from './common/Footer'

// s
function App() {
// s
  return (
    <AuthProvider>
      <DataProvider>
        <CalendarProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/searchcarlist" element={<Searchcarlist/>}/>
            <Route path="/guide" element={<GuidePage/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/joinA" element={<JoinFormA/>}/>
            <Route path="/joinB" element={<JoinFormB/>}/>
            <Route path="/joinC" element={<JoinFormC/>}/>
            <Route path='/searchcarlist' element={<Searchcarlist />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </CalendarProvider>
      </DataProvider>
    </AuthProvider>
  )
}
export default App