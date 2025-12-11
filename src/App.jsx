import { useState } from 'react'
import './App.css'
import GuidePage from './pages/Guide'
import DataProvider from './contexts/Datacontext'

function App() {

  return (
    <>
    <DataProvider>
      <GuidePage/>
    </DataProvider>
    </>
  )
}
export default App
