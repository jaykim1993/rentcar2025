
import './App.css';
import GuidePage from './pages/Guide';
import Header from './common/Header';
import Home from './pages/Home';
import Searchcarlist from './pages/Searchcarlist';
import DetailPage from './pages/DetailPage';
import Recentcarlist from './pages/Recentcarlist';
import Reservation from './pages/Reservation'
import CustomerService from './pages/CustomerService';
import LocationPage from './pages/Location';
import Mypage from './pages/Mypage';
import MypageDetail from './pages/MypageDetail';
import MypageInquiry from './pages/MypageInquiry';
import MypageMyinfo from './pages/MypageMyinfo';
import MypageBooked from './pages/MypageBooked';
// 해연
import AllCarPage from './pages/Manager/AllCarPage';
import AllReservationPage from './pages/Manager/AllReservationPage';
import CarRegPage from './pages/Manager/CarRegPage';

import AuthProvider from './contexts/Authcontext';
import CalendarProvider from './contexts/Calendarcontext';
import DataProvider from './contexts/Datacontext';
import BookingProvider from './contexts/Bookingcontext';

import Footer from './common/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BookingProvider>
          <CalendarProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/searchcarlist" element={<Searchcarlist />} />
                <Route path="/detailpage/:id" element={<DetailPage />} />
                <Route path="/reservation" element={<Reservation/>}/>
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/customerservice" element={<CustomerService />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/recent" element={<Recentcarlist />} />
                <Route path="/mypage" element={<Mypage />}>
                    <Route path="booked" element={<MypageBooked/>} />
                    <Route path="detail/:id" element={<MypageDetail />} />
                    <Route path="inquiry" element={<MypageInquiry />} />
                    <Route path="myinfo" element={<MypageMyinfo />} />
                </Route>
                {/* 해연 */}
                <Route path="/manager/carlist" element={<AllCarPage/>}/>
                <Route path="/manager/reservationlist" element={<AllReservationPage/>}/>
                <Route path="/manager/carregister" element={<CarRegPage/>}/>
              </Routes>
              <Footer />
            </BrowserRouter>
          </CalendarProvider>
        </BookingProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
