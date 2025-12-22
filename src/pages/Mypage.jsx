import './Mypage.css'
import { Outlet } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from '../contexts/Authcontext';
import { Link } from 'react-router-dom';


export default function Mypage(){

  const {username}=useContext(AuthContext);
  return(

    <>
      <div className="guideWrap">
        <div className="guideTop">
            {/* 수정 필요 */}
            <div className="guideGoToHome" to={'/'}>홈</div>
            <span><i className="bi bi-caret-right-fill"></i></span>
            <div>이용가이드</div>
        </div>
        <div className="guideFlex">
          <div className="guideLeft">
            <h2 className="guideSideText"><div className='loginColor'>{username}</div>님,</h2>
            <h2 className="guideSideText">안녕하세요!</h2>
            <Link to='booked'><span className='MyPageSideMenus'>예약내역</span></Link>
            <Link to='myinfo'><span className='MyPageSideMenus'>내 정보</span></Link>
            <Link to='inquiry'><span className='MyPageSideMenus'>1:1문의내역</span></Link>
          </div>
          <div className="guideRight">
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}