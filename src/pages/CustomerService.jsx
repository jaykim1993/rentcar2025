import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import './CustomerService.css'
import { useContext } from "react"
import { AuthContext } from "../contexts/Authcontext"
import { useNavigate } from "react-router-dom"

export default function CustomerService(){

    const navigate = useNavigate();
    //로그인 상태 받아오기
    const {userid}=useContext(AuthContext)
    console.log(userid)
    const isLogin = !!userid;
    console.log(isLogin)

    //모달 기본값
    const [modal1Open,setModal1Open]=useState(false)
    const [modal2Open,setModal2Open]=useState(false)
    const [modalOverLay,setModalOverLay]=useState(false)

    //모달컨트롤러
    const modal1 =()=>{
        setModal1Open(true)
        setModalOverLay(true)
    }
    const modalClose=()=>{
        if(modal1Open){
        setModal1Open(false);
        setModalOverLay(false);
        }
    }
    const gotoLogin =()=>{
        if(modal1Open){
        setModal1Open(false);
        setModalOverLay(false);
        navigate('/login')
        }
    }

    //FAQ state 토글
    const [openIndex, setOpenIndex] = useState(null);
    //FAQ나올값
    const faqList = [
    {
        q: '차량대여는 모든 연령이 가능한가요?',
        a: '차랑차랑 렌터카 상품은 최소 만 21세 이상 대여가 가능해요'
    },
    {
        q: '타인이 대리 예약 할 수 있나요?',
        a: '타인 예약은 불가능해요. 예약 시 결제카드 소유주와 운전자, 결제자가 모두 동일해야 합니다.'
    },
    {
        q: '지점에 직접 연락해서 예약하는 것도 가능한가요?',
        a: `차랑차랑 렌터카 지점을 통해 직접 예약하시는것도 가능합니다.
        대여하고자 하는 지점으로 직접 연락하셔서 대여 기간과 차종을 말씀해주시고,
        회원 할인 등 적용되는 할인 프로그램을 선택하시어 예약 후 사용하시면 됩니다.`
    },
    {
        q: '차량 내부에서 흡연시 클리닝 비용이 청구되나요?',
        a: '차량 내부에서 흡연으로 인하여 차량 내 오염 또는 악취 발생시 실내 클리닝 비용이 청구됩니다.'
    },
    {
        q: '사고 발생 시에는 어떻게 해야 하나요?',
        a: '1599-9111로 전화 후 1번 사고접수를 선택해주세요.'
    }
    ];
    //공지사항 페이지 출력 기본값
    const [cusShowSubPage,setCusShowSubPage]=useState(null);
    const notice1 = ()=>{
        setCusShowSubPage(1);
    };
    const notice2 = ()=>{
        setCusShowSubPage(2);
    };
    const notice3 = ()=>{
        setCusShowSubPage(3);
    };
    const cusBack = ()=>{
        setCusShowSubPage(null);
    };
    const today= new Date()
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const day = week[today.getDay()];
    const custoday = `${year}. ${month}. ${date} ${day}`;

    //날짜 따오기 
    function formatDate(date) {
        const d = new Date(date);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0"); // 월은 0~11
        const day = String(d.getDate()).padStart(2, "0");

        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} / ${hours}:${minutes}:${seconds}`;
        }
    
    // 1:1문의 로컬스토리지 남기기
    const [inquiries,setInquiries]=useState([]); //전체문의내역 배열

    const [inquiriesTitle,setInquiriesTitle]=useState(''); //문의 제목
    const [inquiriesContent,setInquiriesContent]=useState(''); //문의 본문
    const inquiriesHandler = () => {
    if (!inquiriesTitle || !inquiriesContent) return alert("모든 항목을 입력하세요");
        
    const newinquiries ={id:Date.now(),
                        userid:userid,
                        title:inquiriesTitle,
                        content:inquiriesContent,
                        whenCreate:formatDate(new Date())
    }
    //제이슨형태로 현재 빈 배열에있는걸 읽고 
    const prev = JSON.parse(localStorage.getItem("inquiries")) || [];

    const updatedInquiries = [...prev, newinquiries];
        localStorage.setItem("inquiries", JSON.stringify(updatedInquiries));

    setInquiries(updatedInquiries);
    setInquiriesTitle('')
    setInquiriesContent('')
    alert('1:1문의 등록이 완료되었습니다.')
    setModal1Open(false)
    setModalOverLay(false)
    }
    return(
        <>
            
            {modal1Open &&
            //1대1문의
                (isLogin?
                    //로그인상태일때
                    <div className="modalOpen">
                        <i className="bi bi-x" onClick={modalClose}></i>
                        <h3>1:1 문의</h3>
                        <div className="modal1Content">
                            <span>안녕하세요 {userid}님</span>
                            <p>무엇을 도와드릴까요?</p>
                            <input className="modal1title" type="text" placeholder="제목을 입력하세요." onChange={(e)=>setInquiriesTitle(e.target.value)} value={inquiriesTitle}/>
                            <textarea className="modal1content" type="text" placeholder="문의 내용을 입력하세요." onChange={(e)=>setInquiriesContent(e.target.value)} value={inquiriesContent}/>
                        </div>
                        <div className="submitinqu">
                            <button onClick={inquiriesHandler} >등록하기</button>
                        </div>
                    </div>
                    :
                    //비로그인상태일때
                    <div className="modalOpen">
                        <i onClick={modalClose} className="bi bi-x"></i>
                        <p className="havetologin">1:1문의는 로그인 이후에 이용할 수 있어요.</p>
                        <div className="submitinqu">
                            <button onClick={gotoLogin} >로그인하기</button>
                        </div>
                    </div>
                )
            }
            {modalOverLay &&<div className="cusOverlay"></div>}
             <div className="guideWrap">
                <div className="guideTop">
                    {/* 수정 필요 */}
                    <div><Link to={'/'} className="guideGoToHome">홈</Link></div>
                    <span><i className="bi bi-caret-right-fill"></i></span>
                    <div><span className={`guideGoToHome ${cusShowSubPage?'':'active'}`} onClick={cusBack}>고객센터</span></div>
                    {cusShowSubPage !== null &&
                    <div>
                        <span><i className="bi bi-caret-right-fill"></i></span>
                        <span>공지사항</span>
                    </div>
                    }
                </div>
                <div className="guideFlex">
                    <div className="guideLeft">
                        <h2 className="guideSideText">고객센터</h2>
                        <span className={`guideSideMenus2 ${cusShowSubPage?'active':''}`} onClick={() => {window.scrollTo({top: 0,behavior: 'smooth',})}}>상담 안내</span>
                        <span className={`guideSideMenus2 ${cusShowSubPage?'active':''}`} onClick={() => {window.scrollTo({top: 300,behavior: 'smooth',})}}>자주 찾는 질문</span>
                        <span className={`guideSideMenus2 ${cusShowSubPage?'active':''}`} onClick={() => {window.scrollTo({top: 700,behavior: 'smooth',})}}>공지사항</span>
                    </div>
                    <div className="guideRight">
                        {cusShowSubPage===null?
                            <div>
                                <div className="CusAssistanceWrap">
                                    <h2 className="CusAssH2">무엇을 도와드릴까요?</h2>
                                    <div className="CusAssistance">
                                        <div className="CusAssistanceBox1" onClick={modal1}>
                                            <h3>1:1 문의</h3>
                                            <p>전문 상담원이 필요해요.</p>
                                            <i className="bi bi-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="CusFAQ">
                                    <h2>자주 찾는 질문</h2>
                                    {faqList.map((item, index) => (
                                        <div key={index}>
                                        <div onClick={() => 
                                            setOpenIndex(openIndex === index ? null : index)
                                        }>
                                            <span className="CusFAQSpan">Q. {item.q}</span>
                                            <i className={`bi bi-caret-down-fill ${openIndex === index ? 'active' : ''}`}></i>
                                        </div>
                                        {openIndex === index && (
                                            <div className="togglediv">
                                            <p>{item.a}</p>
                                            </div>
                                        )}
                                        </div>
                                    ))}
                                    </div>
                                <div className="CusNotice">
                                    <div className="CusNoticeBox">
                                        <h2>공지사항</h2>
                                        <div className="CusNoticeLink">
                                            <div onClick={()=>{notice1();window.scrollTo({ top: 0, behavior: 'smooth' });}}><p>운전자격확인 서비스 일시 중단 안내(11/27 18:00~19:00)</p></div>
                                            <div onClick={()=>{notice1();window.scrollTo({ top: 0, behavior: 'smooth' });}}><p>기본정비 서비스 변경 재안내</p></div>
                                            <div onClick={()=>{notice1();window.scrollTo({ top: 0, behavior: 'smooth' });}}><p>개인정보처리방침 개정 안내</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       :cusShowSubPage===1?
                        <div>
                            <p>2025-11-27</p>
                            <h3 className="cusNoticeH3">운전자격확인 서비스 일시 중단 안내(11/27 18:00 ~ 19:00)</h3>
                            <p>안녕하세요. 차랑차랑 렌터카 서비스입니다.</p>
                            <p>항상 저희 서비스를 이용해주셔서 감사합니다.</p><br/><br/>
                            <p>한국도로교통공단 운전면허정보 검증시스템 점검 작업으로 인해</p>
                            <p>아래 작업 시간 동안 운전자격확인 서비스가 중단될 예정입니다.</p><br/><br/>
                            <p><i class="bi bi-square-fill"></i> 작업 일시</p>
                            <p>: 2025.11.27(목) 18:00 ~ 19:00</p><br/><br/>
                            <p><i class="bi bi-square-fill"></i> 작업 내용</p>
                            <p>: 한국도로교통공단 운전면허 자동검증시스템 점검</p><br/><br/>
                            <p><i class="bi bi-square-fill"></i> 작업 영향</p>
                            <p>: 예약 시 운전면허 자동검증 서비스 일시 중단</p><br/><br/>
                            <p>해당 시간 동안 예약 진행된 건은 추가 자격 검증이 진행될 수 있습니다.</p>
                            <p>이용에 참고 부탁드립니다.</p>
                            <div className="cusBottomBtnBox"><button className="cusBottomBtn" onClick={() => {cusBack();window.scrollTo({ top: 0, behavior: 'smooth' });}}>뒤로가기</button></div>
                        </div>
                        :cusShowSubPage===2?
                        <div>
                            <p>2025-09-19</p>
                            <h3 className="cusNoticeH3">기본정비 서비스 변경 재안내</h3>
                            <p>안녕하세요. 차랑차랑 렌터카 서비스입니다.</p>
                            <p>지난 8월 27일 안내드린 기본정비 서비스 이용방법이</p>
                            <p>고객님의 편의를 위해 아래와 같이 변경되어 다시 안내드립니다.</p><br/><br/>
                            <p>[이용방법]</p>
                            <p>-연 1회 고객센터로 고객님께서 직접 방문정비 예약/진행</p><br/><br/>
                            <p><i class="bi bi-square-fill"></i> 문의: 차랑차랑렌터카 고객센터 1599-9111<i class="bi bi-caret-right"></i>2번<i class="bi bi-caret-right"></i>3번</p>
                            <p>(상담시간: 오전9시~오후6시)</p>
                            <div className="cusBottomBtnBox"><button className="cusBottomBtn" onClick={() => {cusBack();window.scrollTo({ top: 0, behavior: 'smooth' });}}>뒤로가기</button></div>
                        </div>
                        :cusShowSubPage===3?
                        <div>
                            <p>2025-8-29</p>
                            <h3 className="cusNoticeH3">개인정보처리방침 개정 안내</h3>
                            <p>차랑차랑렌터카 개인정보처리방침의 내용이 9월 11일부로 다음과 같이 변경됨을 알려드립니다.</p><br/><br/>
                            <p>[주요 개정 내용]</p>
                            <p>고객님의 편의를 위해 아래와 같이 변경되어 다시 안내드립니다.</p>
                            <p>[이용방법]</p>
                            <p>-법적 근거에 따라 처리하는 개인정보 구분</p>
                            <p>-정보주체의 동의에 따라 처리하는 개인정보 구분</p>
                            <p>-개인정보 수집항목, 수집목적, 보유/이용기간 현행화</p>
                            <p>-위수탁 관계 현행화(재위탁 관계 포함)</p>
                            <p>-고정형 영상정보처리기기 현행화, 수탁업체 명시</p><br/><br/>
                            <p>변경사항은 아래 링크에서 확인하실 수 있으며, 개인정보처리방침 전문은 홈페이지를 확인하시기 바랍니다.</p>
                            <div className="cusBottomBtnBox"><button className="cusBottomBtn" onClick={() => {cusBack();window.scrollTo({ top: 0, behavior: 'smooth' });}}>뒤로가기</button></div>
                        </div>
                        : <p>페이지를 새로고침해주세요.</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}