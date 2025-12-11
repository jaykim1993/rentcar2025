import './Header.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Authcontext';
import { useNavigate, Link } from 'react-router-dom';


export default function Header() {
    const navigate = useNavigate();

    // login 관련 Context API에서 변수&함수 불러오기
    const{userid, logout} = useContext(AuthContext);

    // logout 핸들러 함수
    const logoutHandler =()=>{
        logout();
        alert("로그아웃 되었습니다.");
        navigate('/');
    }

    // 사이드네비게이션 활성화 상태 변수 (초기값 false)
    const [isNavOpen, setIsNavOpen] = useState(false);
    // 사이드 메뉴 오픈 함수
    const openNav = () => {
        setIsNavOpen(true)
    };
    // 사이드 메뉴 닫기 함수
    const closeNav = () => {
        setIsNavOpen(false)
    };
    
    return (
        <div className='headerWrap'>
            <header className="header">
            <div>
                <button 
                    className='headerBtnCate' 
                    onClick={isNavOpen ? closeNav : openNav}
                >
                    <i className="bi bi-list"></i>
                </button>

            </div>
                <Link to="/">
                    <img className='headerLogo' src='charangcharang_logo.png'/>
                    {/* <p className='headerBrand'>차랑차랑</p> */}
                </Link>
            <nav className="headerNavTop">
                <Link to="/">
                    <button className='headerBtn' type='text'>
                        <i className="bi bi-house-door-fill"></i>
                    </button>
                </Link>
                {userid?
                    // 로그인 상태일 때
                    <>
                        <button className='headerBtn' type='text'>
                            <i className="bi bi-person-fill"></i> {userid?.userid}
                        </button>
                        <button className='headerBtn' type='text'>
                            찜한 목록
                        </button>
                        <button className='headerBtn' type='text' onClick={logoutHandler}>
                            로그아웃
                        </button>
                    </>
                    :
                    <>
                        <Link to="/login">
                            <button className='headerBtn' type='text'>
                                로그인
                            </button>
                        </Link>
                        <Link to="/joinA">
                            <button className='headerBtn' type='text'>
                                회원가입
                            </button>
                        </Link>
                    </>
                }
            </nav>
            </header>
            <nav className={`headerNavSide ${isNavOpen ? "on" : ""}`}>
                <button className="headerBtnX" onClick={closeNav}>
                    <i className="bi bi-x"></i>
                </button>
                <div className="headerNavContent">
                    <div className="headerNavAd">
                        <strong>광고이미지 들어와</strong><br />
                    </div>
                    <ul className="headerNavUl">
                        <p className='headerNavH'>차량 렌트</p>
                        <li className='headerNavLi'><div>빠른 예약</div> <div className='headerNavpointer'>→</div></li><br />
                        <li className='headerNavLi'><div>월 렌트</div> <div className='headerNavpointer'>→</div></li><br />
                        <p className='headerNavH'>고객 가이드</p>
                        <li className='headerNavLi'><div>고객센터</div> <div className='headerNavpointer'>→</div></li><br />
                        <li className='headerNavLi'><div>지점안내</div> <div className='headerNavpointer'>→</div></li><br />
                        <li className='headerNavLi'><div><Link to={'/guide'}>이용가이드</Link></div> <div className='headerNavpointer'>→</div></li><br />
                        <p className='headerNavH'>회원 맞춤</p>
                        <li className='headerNavLi'><div>최근 본 차량</div> <div className='headerNavpointer'>→</div></li><br />
                        <li className='headerNavLi'><div>마이페이지</div> <div className='headerNavpointer'>→</div></li><br />
                    </ul>
                </div>
            </nav>
        </div>
        
    );
}
