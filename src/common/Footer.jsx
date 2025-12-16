import './Footer.css';

export default function Footer(){

    return(
        <div className='Footer'>
            <div className='Footer_Top'>
                {/* 공지사항 */}
                <div className="notice">
                    <h4>공지사항</h4>
                </div>

                <img src='./charangcharang_logo.png' alt='차랑차랑 로고 이미지' />

                {/* 푸터 섹션 */}
                <div className='Footer_sec'>
                    {/* 좌측 - 회사정보 */}
                    <div className='F_info'>
                        <ul className='F_infoUl'>
                            <li className='F_infoLi01'>
                                <p>회사소개</p>
                                <p>서비스 이용약관</p>
                                <p><strong>개인정보처리방침</strong></p>
                                <p>이메인무단수집거부</p>
                            </li>
                            <li className='F_infoLi02'>
                                <p><strong>차랑차랑㈜</strong> | 서울특별시 신촌로</p>
                                <p>대표이사 김성중 | 차빌려조</p>
                                <p>대표번호 | 1234-5678</p>
                            </li>
                        </ul>
                    </div>

                    {/* 우측 - 고객센터 */}
                    <div className='F_support'>
                        <h4>고객센터</h4>
                        <h4>910-1112</h4>
                    </div>
                </div>
            </div>
            <div className='F_copyright'>
                <p>Copyright© 2025 차랑차랑 All rights Reserved</p>
            </div>
        </div>
    )
}