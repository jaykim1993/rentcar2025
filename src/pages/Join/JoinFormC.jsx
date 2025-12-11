// 추가정보 입력(필수는 * 표시)
// 가입완료 버튼 (+자동로그인, 메인으로 넘어가기)
import './JoinForm.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from "react-router-dom";
import DaumPostCode from 'react-daum-postcode';


export default function JoinFormC() {
    const navigate = useNavigate();

    // state에서 데이터 받아오기
    
    const { state } = useLocation();
    const { userid, userpw } = state || {};
  
    // 앞에서 받아오지 못할 시 방어코드
    useEffect(() => {
        if (!userid || !userpw) {
        alert("잘못된 접근입니다. 다시 회원가입을 진행해주세요.");
        navigate("/joinB");
        }
    }, [userid, userpw, navigate]);


    // 3. 이름: 홍길동
    const[username, setUserName] = useState("");
    // 4. 이메일: emailId @ emailDomain
    const [emailId, setEmailId] = useState("");
    const [emailDomain, setEmailDomain] = useState("naver.com");
    const user_email = `${emailId}@${emailDomain}`;

    // 5. 주민등록번호 (resistFront - resistBack)
    const [resistFront, setResistFront] = useState("");
    const [resistBack, setResistBack] = useState("");
    const user_resistnum = `${resistFront}-${resistBack}`;

    // 6. 전화번호 (PhoneFront - phoneMiddle - phoneBack)
    const [phoneFront, setPhoneFront] = useState("");
    const [phoneMiddle, setPhoneMiddle] = useState("");
    const [phoneBack, setPhoneBack] = useState("");
    const user_phonenum = `${phoneFront}-${phoneMiddle}-${phoneBack}`;

    // 7. 주소 (address)
    // 8. 상세주소 (address_detail)
    // DaumPostCode API 사용
    const [address, setAddress] = useState("");
    const [address_detail, setAddress_detail] = useState("");
    const [zipcode, setZipcode]=useState('')
    const [isOpen, setIsOpen] = useState(false)

    const addresstHandler = (data) => {
        let arr =''
        if(data.userSelectedType === 'R'){
            arr = data.roadAddress; //도로명 주소
        }else{
            arr = data.jibunAddress; //지역명 주소
        }
        setZipcode(data.zonecode);
        setAddress(arr);
        setIsOpen(!isOpen)
    }
     // 모달 보이기/숨기기
    const addressToggle = () => { setIsOpen(!isOpen) }    

    // 9. 내/외국인 체크박스
    const [user_iskorean, setUser_iskorean] = useState(false)
    // 내/외국인 판별 함수
    const toggle = () => {
        setUser_iskorean(prev => {
        const newValue = !prev;
        return newValue;
        });
        console.log(user_iskorean)
    };
    
    // 10. 운전면허증 (licenseFront - licenseBack)
    const [licenseFront, setLicenseFront] = useState("");
    const [licenseSecond, setLicenseSecond] = useState("");
    const [licenseThird, setLicenseThird] = useState("");
    const [licenseBack, setLicenseBack] = useState("");
    const user_license = `${licenseFront}-${licenseSecond}-${licenseThird}-${licenseBack}`;


    // 데이터 DB에 추가
    const signup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost/rentcar2025/backend/api/join.php',
                {
                    userid,
                    userpw,
                    username,
                    user_email,
                    user_resistnum,
                    user_phonenum,
                    user_license,
                    address,
                    address_detail

                }
            );

            console.log("join입력", res.data);

            if (res.data.status === 'success') {
                alert("회원 가입을 환영합니다. 로그인 페이지로 이동합니다.");
                navigate('/login');
                // 초기화
                setEmailId("");
                setEmailDomain("naver.com");
                setResistFront("");
                setResistBack("");
                setPhoneFront("");
                setPhoneMiddle("");
                setPhoneBack("");
                setAddress("");
                setAddress_detail("");
                setLicenseFront("");
                setLicenseBack("");
                setUser_iskorean("");
            } else {
                alert(res.data.message || "회원 가입 실패");
            }
        } catch (error) {
            console.log("에러", error);
            alert("서버 연결 오류");
        }
    };

    return (
        <div className='joinOverlay'>
            <div className="joinWrap">
                <button className="joinBtnX">
                    <Link to={'/'}><i className="bi bi-x"></i></Link>
                </button>
                <h2 className='joinH'><span className='joinColorText'>추가정보</span>를 입력해주세요.</h2>
                <ul className='joinUlC'>
                    <li className='joinLiB'>
                        <label className='joinLabelB'>
                            <div className='joinTextC'>* 이름</div>
                            <div className="joinContentC">
                                <input className='joinInputName'
                                    type="text"
                                    placeholder="이름 입력"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </label>
                    </li>
                    <li className='joinLiB'>
                        <label className='joinLabelB'>
                            <div className='joinTextC'>* 이메일</div>
                            <div className="joinContentC">
                                <input className='joinInputEmail'
                                    type="text"
                                    placeholder="이메일 계정 입력"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                                @
                                <select className='joinSelectEmail'
                                    value={emailDomain}
                                    onChange={(e) => setEmailDomain(e.target.value)}
                                >
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                </select>
                            </div>
                        </label>
                    </li>
                    <li className='joinLiB'>
                        <label className='joinLabelB'>
                            <div className='joinTextC'>* 주민등록번호</div>
                            <div className="joinContentC">
                                <input className='joinInputResi'
                                    type="text"
                                    maxLength="6"
                                    placeholder="생년월일 입력"
                                    value={resistFront}
                                    onChange={(e) => setResistFront(e.target.value)}
                                />
                                -
                                <input className='joinInputResi'
                                    type="password"
                                    maxLength="7"
                                    placeholder="0000000"
                                    value={resistBack}
                                    onChange={(e) => setResistBack(e.target.value)}
                                />
                            </div>
                        </label>
                    </li>
                    <li className='joinLiB'>
                        <label className='joinLabelB'>
                            <div className='joinTextC'>* 전화번호</div>
                            <div className="joinContentC">
                                <input className='joinInput4'
                                    type="text"
                                    maxLength="3"
                                    value={phoneFront}
                                    placeholder='010'
                                    onChange={(e) => setPhoneFront(e.target.value)}
                                />
                                -
                                <input className='joinInput4'
                                    type="text"
                                    maxLength="4"
                                    value={phoneMiddle}
                                    onChange={(e) => setPhoneMiddle(e.target.value)}
                                />
                                -
                                <input className='joinInput4'
                                    type="text"
                                    maxLength="4"
                                    value={phoneBack}
                                    onChange={(e) => setPhoneBack(e.target.value)}
                                />
                            </div>
                        </label>
                    </li>
                    <li className='joinLiB'>
                        <label className='joinLabelB'>
                            <div className='joinTextCC'>주소</div>
                            <div className='joinContentC'>
                                <input  className='joinInputAdd'
                                    type='text' 
                                    value={zipcode} 
                                    placeholder='우편번호' 
                                    readOnly 
                                    name='post' 
                                    id='post'/>
                                <button className='joinbtnC'
                                    type='button' 
                                    id='userAddSearch' 
                                    onClick={addressToggle}>
                                        우편번호 검색
                                </button>
                                <div className="joinContentC">
                                    <input  className='joinInputLong'
                                    type='text' 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    placeholder='도로명 주소' 
                                    name='address' 
                                    id='address'/>
                                </div>
                                <input  className='joinInputLong'
                                type='text' 
                                value={address_detail} 
                                onChange={(e) => setAddress_detail(e.target.value)} 
                                placeholder='상세주소' 
                                name='Address' 
                                id='address_detial'
                                />
                                {isOpen && 
                                <div className='joinCOverlay' onClick={addressToggle}>
                                    <button className='joinBtnX' onClick={addressToggle}>X</button>
                                    <h2 className='joinH'>주소 검색</h2>
                                    <DaumPostCode  onComplete={addresstHandler} height="100%"/>
                                </div>
                                }
                            </div>
                        </label>
                    </li>
                    <li className='joinLiB'>
                        <label htmlFor="isKorean" className='joinLabelB'>
                        <div className='joinTextCC'>  해외국적자</div>  
                        <input
                            id='isKorean'
                            className='joinCheckC'
                            type="checkbox"
                            onChange={toggle}
                        />
                        </label>
                    </li>
                    <li className='joinLiB'>
                        <label className='joinLabelB'>
                            <div className='joinTextCC'>운전면허번호</div>
                            <div className="joinContentC">
                                <input className='joinInputC'
                                    type="text"
                                    maxLength="2"
                                    placeholder="00"
                                    value={licenseFront}
                                    onChange={(e) => setLicenseFront(e.target.value)}
                                />
                                -
                                <input className='joinInputC'
                                    type="text"
                                    maxLength="2"
                                    placeholder="00"
                                    value={licenseSecond}
                                    onChange={(e) => setLicenseSecond(e.target.value)}
                                />
                                -
                                <input className='joinInputCC'
                                    type="text"
                                    maxLength="6"
                                    placeholder="000000"
                                    value={licenseThird}
                                    onChange={(e) => setLicenseThird(e.target.value)}
                                />
                                -
                                <input className='joinInputC'
                                    type="text"
                                    maxLength="2"
                                    placeholder="00"
                                    value={licenseBack}
                                    onChange={(e) => setLicenseBack(e.target.value)}
                                />
                            </div>
                        </label>
                    </li>

                </ul>
                <div className="joinNextbtn">
                    <button 
                    className="joinFormNext" 
                    type="submit" 
                    onClick={signup}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}

