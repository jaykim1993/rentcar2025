// import { useState } from 'react'
import './App.css'
// import RentalCalendar from './pages/Calender'
import ReservationCalendar from './pages/Calender02'
import RentalCalendar from './contexts/Calendercontext'
import Home from './pages/Home'
import TwoMonthCalendar from './contexts/Calendercontext copy'
import Recentcar from './pages/Recentcar'
import DataProvider from './contexts/Datacontext'

function App() {

  return (
    <>
      {/* <RentalCalendar/> */}
      {/* <ReservationCalendar/> */}
      {/* <RentalCalendar/> */}
      <DataProvider>
        <TwoMonthCalendar/>
        <Home/>
        <Recentcar/>
      </DataProvider>
    </>
  )
}

export default App
