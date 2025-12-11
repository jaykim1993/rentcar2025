// 아이디 (중복확인 필요)
// 비밀번호 (+비밀번호 재입력까지)
// 아이디 최대 15자
// 비밀번호 10~20자 내외
import './JoinForm.css';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { Link, useNavigate } from "react-router-dom";


export default function JoinFormB() {
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");
  const [userpwCheck, setUserpwCheck] = useState("");

  // DB 내 아이디 중복 체크
  const checkId = async () => {
    if (!userid) return alert("아이디를 입력하세요.");

    try {
      const res = await axios.post("http://localhost/rentcar2025/backend/api/join.php", { userid });

      if (res.data.exists) {
        alert("중복된 아이디입니다.");
      } else {
        alert("사용가능한 아이디입니다.");
      }
    } catch (err) {
      console.error(err);
      alert("오류 발생");
    }
  };

  // 비밀번호 확인 버튼 함수
  const checkpw =()=>{
    if(userpw == userpwCheck){
      alert("비밀번호 확인 완료")
    } else { 
      alert("입력하신 비밀번호가 다릅니다.")
      setUserpwCheck('')
    }
  }
  // 다음 버튼 함수
  const goNext = () => {
    if (!userid || !userpw)
      return alert("아이디와 비밀번호를 모두 입력하세요.");
    // 페이지 이동 + userid, userpw 전달
    navigate("/joinC", {
      state: {
        userid,
        userpw,
      },
    });
  };
    return (
      <div className='joinOverlay'>
        <div className="joinWrap">
            <button className="joinBtnX">
              <Link to={'/'}><i className="bi bi-x"></i></Link>
            </button>
            <h2 className='joinH'><span className='joinColorText'>아이디</span>와 <span className='joinColorText'>비밀번호</span>를 설정해주세요.</h2>
            <ul className='joinUlB'>
                <li className='joinLiB'>
                    <label className='joinLabelB'>
                        <div className='joinTextB'>아이디</div>
                        <div className='joinContentB'>
                          <input
                              className='joinInputB'
                              type="text"
                              placeholder="아이디"
                              value={userid}
                              onChange={(e)=>setUserid(e.target.value)}
                          />
                        </div>
                        <button
                        className='joinBtnB'
                        type='button' 
                        onClick={checkId}>
                          확인
                        </button>
                    </label>
                </li>
                <li className='joinLiB'>
                    <label className='joinLabelB'>
                        <div className='joinTextB'>비밀번호</div>
                        <div className='joinContentB'>
                          <input
                            className='joinInputB'
                            type="password"
                            placeholder="비밀번호"
                            value={userpw}
                            onChange={(e)=>setUserpw(e.target.value)}
                          />
                        </div>
                    </label>
                </li>
                <li className='joinLiB'>
                    <label className='joinLabelB'>
                        <div className='joinTextB'>비밀번호 확인</div>
                        <div className='joinContentB'>
                          <input
                              className='joinInputB'
                              type="password"
                              placeholder="비밀번호 확인"
                              value={userpwCheck}
                              onChange={(e)=>setUserpwCheck(e.target.value)}
                          />
                        </div>
                        <button 
                        className='joinBtnB'
                        onClick={checkpw}>
                          비밀번호 확인
                        </button>
                    </label>
                </li>

            </ul>

            <div className="joinNextbtn">
                <button 
                className="joinFormNext" 
                type="submit" 
                onClick={goNext}>
                  다음
                </button>
            </div>
        </div>
      </div>
    );
}
