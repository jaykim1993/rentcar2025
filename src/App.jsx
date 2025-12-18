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
import BookingProvider from './contexts/Bookingcontext'
import Footer from './common/Footer'
import LocationPage from './pages/Location'
import CustomerService from './pages/CustomerService'
import DetailPage from './pages/DetailPage'

function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <CalendarProvider>
          <BookingProvider>
            <BrowserRouter>
              <Header/>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/searchcarlist" element={<Searchcarlist/>}/>
                <Route path="/detailpage/:id" element={<DetailPage/>}/>
                <Route path="/guide" element={<GuidePage/>}/>
                <Route path="/customerservice" element={<CustomerService/>}/>
                <Route path="/location" element={<LocationPage/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/joinA" element={<JoinFormA/>}/>
                <Route path="/joinB" element={<JoinFormB/>}/>
                <Route path="/joinC" element={<JoinFormC/>}/>
              </Routes>
              <Footer />
            </BrowserRouter>
            </BookingProvider>
        </CalendarProvider>
      </DataProvider>
    </AuthProvider>
  )
}
export default App