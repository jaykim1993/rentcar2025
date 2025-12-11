// import { useState } from 'react'
import './App.css'
// import RentalCalendar from './pages/Calender'
// import ReservationCalendar from './pages/Calender02'
import Home from './pages/Home'
// import TwoMonthCalendar from './contexts/Calendercontext copy'
import Recentcar from './pages/Recentcar'
import DataProvider from './contexts/Datacontext'

// import Home from './pages/Home'
// import Footer from './common/Footer'

function App() {

  return (
    <>
      <DataProvider>
        {/* <TwoMonthCalendar/>
        <Home/> */}
        <Recentcar/>
      </DataProvider>
    </>
  )
}

export default App
