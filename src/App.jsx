// import { useState } from 'react'
import './App.css'
// import RentalCalendar from './pages/Calender'
// import ReservationCalendar from './pages/Calender02'
import Home from './pages/Home'
import CalenderProvider from './contexts/Calendercontext'
import Recentcar from './pages/Recentcar'
import DataProvider from './contexts/Datacontext'
import RentalCalendar from './pages/Calender'

function App() {

  return (
    <>
      {/* <RentalCalendar/> */}
      {/* <ReservationCalendar/> */}
      {/* <RentalCalendar/> */}
      
        <DataProvider>
          <CalenderProvider>
            <RentalCalendar/>
            <Home/>
            <Recentcar/>
          </CalenderProvider>
        </DataProvider>
      
    </>
  )
}

export default App
