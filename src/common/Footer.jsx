import './Footer.css';

export default function Footer(){

    return(
        <div className='Footer'>
            {/* 공지사항 */}
            <div className="notice">
                <h2>공지사항</h2>
            </div>

            <h1 style={{color: '#293dd8'}}>차랑차랑</h1>

            {/* 좌측 - 회사정보 */}
            <div className='F_info'>
                <ul>
                    <li>
                        <p>회사소개</p>
                        <p>서비스 이용약관</p>
                        <p><strong>개인정보처리방침</strong></p>
                        <p>이메인무단수집거부</p>
                    </li>
                    <li>
                        <p><strong>차랑차랑㈜</strong></p>
                        <p>서울특별시 신촌로</p>
                        <br/>
                        <p>대표이사 김성중</p>
                        <p>차빌려조</p>
                        <br/>
                        <p>대표번호</p>
                        <p>1234-5678</p>
                    </li>
                </ul>
            </div>

            {/* 우측 - 고객센터, 문의 정보 */}
            <div className='F_support'>

            </div>
        </div>
    )
}