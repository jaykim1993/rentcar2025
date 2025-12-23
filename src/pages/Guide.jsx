import { useState,useEffect } from "react"
import { useContext } from "react"
import { DataContext } from "../contexts/Datacontext"
import './Guide.css'
import { Link } from "react-router-dom"

export default function GuidePage(){

const {cars}=useContext(DataContext); //데이터받아오기

const [showPage,setShowPage]=useState(true); //기본화면 출력 기본값 true
const showGuideOne=()=>{
    setShowPage(true);
    console.log(showPage)
}
const showGuideTwo=()=>{
    setShowPage(false);
    console.log(showPage)
}

const carsCopy=[...cars] //얕은복사

const uniqueCars = carsCopy.filter((car, index, array) =>   // 얕은복사한거로 중복제거
  index === array.findIndex(carItem => carItem.model === car.model)
);
//=====================================================================================================================
const [selectWhereCar,SetSelectWhereCar]=useState(true); //국내/수입 차량 선택 기본값   국내true 수입false
const selectKorean=()=>{
    SetSelectWhereCar(true);
    SetSelectKoreanSize(1);
    console.log(selectWhereCar);
}
const selectForeign=()=>{
    SetSelectWhereCar(false);
    SetSelectForeignSize(1)
    console.log(selectWhereCar);
}
 //=====================================================================================================================
const [selectKoreanSize, SetSelectKoreanSize]=useState(1); //국내차량 사이즈선택 기본값   소형 1 중형2 대형3 RV4 화물5
const selectKoreanSmall=()=>{  //국내소형선택
    SetSelectKoreanSize(1);
    console.log(selectKoreanSize);
}
const selectKoreanMiddle=()=>{  //국내중형선택
    SetSelectKoreanSize(2);
    console.log(selectKoreanSize);
}
const selectKoreanLarge=()=>{  //국내대형선택
    SetSelectKoreanSize(3);
    console.log(selectKoreanSize);
}
const selectKoreanRV=()=>{  //국내RV선택
    SetSelectKoreanSize(4);
    console.log(selectKoreanSize);
}
const selectKoreanTruck=()=>{  //국내화물선택
    SetSelectKoreanSize(5);
    console.log(selectKoreanSize);
}
//=====================================================================================================================

const [selectForeignSize, SetSelectForeignSize]=useState(1); //수입차량 사이즈선택 기본값   소형 1 중형2 대형3
const selectForeignSmall=()=>{  //수입소형선택
    SetSelectForeignSize(1);
     console.log(selectForeignSize);
}
const selectForeignMiddle=()=>{  //수입중형선택
    SetSelectForeignSize(2);
    console.log(selectForeignSize);
}
const selectForeignLarge=()=>{  //수입대형선택
    SetSelectForeignSize(3);
    console.log(selectForeignSize);
}
//=====================================================================================================================
const KOREAN_BRANDS = ['한대', '크아', '제네러스', 'KGB', '라노', '쉐레보'];
const FOREIGN_BRANDS = ['아우디즈', '빈츠', 'dmw', '렉사드', '테셀라', '볼바즈','복스바그','토유','BYD'];
const SMALL_SIZES = ['소형', '경소형'];

// 사이즈나 타입 별 분류 
const koreanSmall = uniqueCars.filter(item => 
  KOREAN_BRANDS.includes(item.brand) && SMALL_SIZES.includes(item.car_size)
);
const koreanMiddle = uniqueCars.filter(item => 
  KOREAN_BRANDS.includes(item.brand) && item.car_size === '중형'
);
const koreanLarge = uniqueCars.filter(item => 
  KOREAN_BRANDS.includes(item.brand) && item.car_size === '대형'
);
const koreanRV = uniqueCars.filter(item => 
  KOREAN_BRANDS.includes(item.brand) && item.car_type === 'RV'
);
const koreanTruck = uniqueCars.filter(item => 
  KOREAN_BRANDS.includes(item.brand) && item.car_type === '화물'
);
const foreignSmall = uniqueCars.filter(item => 
  FOREIGN_BRANDS.includes(item.brand) && SMALL_SIZES.includes(item.car_size)
);
const foreignMiddle = uniqueCars.filter(item => 
  FOREIGN_BRANDS.includes(item.brand) && item.car_size === '중형'
);
const foreignLarge = uniqueCars.filter(item => 
  FOREIGN_BRANDS.includes(item.brand) && item.car_size === '대형'
);

const getFilteredCars = () => {
        if (selectWhereCar) { // 국내차
            if (selectKoreanSize === 1){return koreanSmall} 
            else if (selectKoreanSize === 2){return koreanMiddle}
            else if (selectKoreanSize === 3){return koreanLarge}
            else if (selectKoreanSize === 4){return koreanRV}
            else if (selectKoreanSize === 5){return koreanTruck}
            else return [];
        } else { // 수입차
            if (selectForeignSize === 1){return foreignSmall}
            else if (selectForeignSize === 2){return foreignMiddle}
            else if (selectForeignSize === 3){return foreignLarge}
            else return [];
        }
    };
    const carListToRender = getFilteredCars();

    return(

        <>
            <div className="guideWrap">
                <div className="guideTop">
                    {/* 수정 필요 */}
                    <div><Link className="guideGoToHome" to={'/'}>홈</Link></div>
                    <span><i className="bi bi-caret-right-fill"></i></span>
                    <div>이용가이드</div>
                </div>
                <div className="guideFlex">
                    <div className="guideLeft">
                        <h2 className="guideSideText">렌트이용안내</h2>
                        <span className={`guideSideMenus ${showPage?'active':''}`} onClick={showGuideOne} >대여안내</span>
                        <span className={`guideSideMenus ${!showPage?'active':''}`} onClick={showGuideTwo} >요금안내</span>
                    </div>
                    <div className="guideRight">
                          <h1 className="guideMainText">이용가이드</h1>
                            <div className="guideSelectBar">
                                <button  className={`guideSelectButns ${showPage?'active':''}`} onClick={showGuideOne}>대여안내</button>
                                <button  className={`guideSelectButns ${!showPage?'active':''}`} onClick={showGuideTwo}>요금안내</button>
                            </div>
                        {showPage ? (
                        <div>
                            <h2 className="guideExplain">대여방법 및 절차</h2>
                            <p className="guideExplainDetail">차랑차랑렌터카 사용예약을 위해 고객님께서는 아래 절차대로 진행해 주세요.</p>
                            <div className="guideRentalProcessImg">
                                <img src="./images/guideimgs/guide_1_1.jpg"/>
                            </div>
                            <p className="guideRentalProcessExplain">온라인으로 예약이 어려우신 경우 지점을 방문하시거나
                                전화로 예약이 가능합니다. (고객센터 : 1599-9111)</p>
                            <div className="guideSecond">
                                <h3 className="guideSecondExplain">대여 중 사고시 보상범위</h3>
                                <table className="guidetable1">
                                    <tr>
                                        <th className="guidetable1th">대인</th>
                                        <td className="guidetable1td">무한대</td>
                                    </tr>
                                    <tr>
                                        <th className="guidetable1th">대물</th>
                                        <td className="guidetable1td">사고 건당 2천만원 한도</td>
                                    </tr>
                                    <tr>
                                        <th className="guidetable1th">자손</th>
                                        <td className="guidetable1td">
                                        · 인당 1천5백만원 한도<br/>
                                        · 사고 건당 1억5천만원 한도
                                        </td>
                                    </tr>
                                </table>
                                <span className="guideSecondExplainDetail">계약서상 등록되지 않은 운전자는 종합보험혜택을 받으실 수 없어요.</span>
                            </div>
                            <div className="guideThird">
                                <h3 className="guideThirdExplain">보험(차량손해면책제도)</h3>
                                <p className="guideThirdExplainDetail">보험 가입 시 고객님의 귀책으로 인한 자차사고에 대해 보상을 받을 수 있는 제도예요.</p>
                                <table className="guidetable2">
                                    <tr className="guidetable2tr">
                                        <th className="guidetable2th">구분</th>
                                        <th className="guidetable2th">국산 · 수입차량</th>
                                    </tr>
                                    <tr className="guidetable2tr">
                                        <td className="guidetable2td">선택안함</td>
                                        <td className="guidetable2td">전액</td>
                                    </tr>
                                    <tr className="guidetable2tr">
                                        <td className="guidetable2td">일반자차</td>
                                        <td className="guidetable2td">30만원</td>
                                    </tr>
                                    <tr className="guidetable2tr">
                                        <td className="guidetable2td">완전자차</td>
                                        <td className="guidetable2td">면제</td>
                                    </tr>
                                </table>
                                <span className="guideThirdExplainDetail">단, 대여차량 계약 시 선택한 보험 종류에 따라 고객 부담금(면책금)이 차등 적용돼요.</span>
                                <span className="guideThirdExplainDetail">보험을 선택하지 않으면 사고 시 모든 비용을 부담해야 해요.</span>
                            </div>
                            <div className="guideFourth">
                                <h3 className="guideFourthExplain">사고처리</h3>
                                <p className="guideFourthExplainDetail">예기치 못한 사고발생! 당황하지 마세요.</p>
                                <div className="guide4service-card">
                                    <div className="guide4service-item">
                                        <div className="guide4title">ONE STOP</div>
                                        <div className="guide4content">서비스</div>
                                    </div>
                                    <div className="guide4service-item">
                                        <div className="guide4title">사고처리 접수</div>
                                        <div className="guide4content">1599-9111</div>
                                    </div>
                                    <div className="guide4service-item">
                                        <div className="guide4title">긴급출동</div>
                                        <div className="guide4content">서비스</div>
                                    </div>
                                </div>
                                <span className="guideFourthExplainDetail">사고 및 고장 발생 시 사고접수(<i className="bi bi-telephone-fill"></i>1599-9111) 전화주세요.</span>
                                <span className="guideFourthExplainDetail">고객님의 안전을 위해 사고처리 전문가가 신속하게 상담해드릴게요.</span>
                                <span className="guideFourthExplainDetail">단 교통법규 위반, 음주운전 등으로 인해 사고발생 시 보상의 범위가 좁혀질 수 있어요.</span>
                            </div>
                            <div className="guideFifth">
                                <h3 className="guideFifthExplain">대여 시 유의사항</h3>
                                <img src="./images/guideimgs/guide_1_5.JPG"/>
                                <span className="guideFifthExplainDetail">대여 당일 차량인수 시 운전면허증 지참은 필수입니다.(도로교통법상 유효한 운전면허소지자)</span>
                                <span className="guideFifthExplainDetail">사전 동의 없이 임의로 연장해 사용하실 경우 차량 손해에 대해 보상 및 면책을 받지 못할 수 있으니, 
                                    이용 연장 시 반드시 약속된 반납 시간 이전에 대여지점으로 연락바랍니다.</span>
                                <span className="guideFifthExplainDetail">금지행위(음주/무면허 등)으로 인한 사고 발생시 보험 혜택 적용이 불가합니다.</span>
                            </div>
                        </div>
                    ) : (
                    <div>
                        <div className="guideSelectWhereBox">
                            <button className={`guideSelectWhereCar ${selectWhereCar? "active" : ""}`} onClick={selectKorean}>국내</button>
                            <button className={`guideSelectWhereCar ${!selectWhereCar? "active" : ""}`} onClick={selectForeign}>수입</button>
                        </div>
                        <div className="guideSelectCarSize">
                            {selectWhereCar?(
                            <div className="guideSelectKorCar">
                                <button className={`guideSelectCarSizeBtn ${selectKoreanSize===1?'active':''}`} onClick={selectKoreanSmall}>경소형</button>
                                <button className={`guideSelectCarSizeBtn ${selectKoreanSize===2?'active':''}`} onClick={selectKoreanMiddle}>중형</button>
                                <button className={`guideSelectCarSizeBtn ${selectKoreanSize===3?'active':''}`} onClick={selectKoreanLarge}>대형</button>
                                <button className={`guideSelectCarSizeBtn ${selectKoreanSize===4?'active':''}`} onClick={selectKoreanRV}>승합/RV</button>
                                <button className={`guideSelectCarSizeBtn ${selectKoreanSize===5?'active':''}`} onClick={selectKoreanTruck}>화물</button>
                            </div>
                            ):(
                            <div className="guideSelectForCar">
                                <button className={`guideSelectCarSizeBtn2 ${selectForeignSize===1?'active':''}`} onClick={selectForeignSmall}>소형</button>
                                <button className={`guideSelectCarSizeBtn2 ${selectForeignSize===2?'active':''}`} onClick={selectForeignMiddle}>중형</button>
                                <button className={`guideSelectCarSizeBtn2 ${selectForeignSize===3?'active':''}`} onClick={selectForeignLarge}>대형</button>
                            </div>
                        )}
                    </div>
                        <span>차량의 기본 대여 금액과 보험 금액은 차량 브랜드별로 가치를 가지며, </span>
                        <p>차량의 연식, 차량 크기, 연료, 옵션 유무에 따라 가격이 계산됩니다.   </p>
                            <table className="guideTable">
                                <thead className="guideThead">
                                    <tr className="guideTr">
                                        <th className="guideTh">차종</th>
                                        <th className="guideTh">기본 요금 (1시간)</th>
                                        <th className="guideTh">일반 자차 (24시간)</th>
                                        <th className="guideTh">완전 자차 (24시간)</th>
                                    </tr>
                                </thead>
                                <tbody className="guideTbody">
                                {carListToRender.length > 0 ? (
                                    carListToRender.map((car) => (
                                    <tr key={car.id}>
                                        <td className="guideTd">{car.model}</td>
                                        {/* 시간당 요금 (3000 * price_value) */}
                                        <td className="guideTd">{(3000 * car.price_value)}원</td>
                                        {/* 하루 일반 자차 보험료 */}
                                        <td className="guideTd">{(10000 * car.price_value)}원</td>
                                        {/* 하루 완전 자차 보험료 */}
                                        <td className="guideTd">{(12000 * car.price_value)}원</td>
                                    </tr>
                                 ))
                                ) : (
                                    <tr>
                                        <td>조회 가능한 차량이 없습니다. 다시 선택해주세요.</td>
                                    </tr>
                                 )}
                                </tbody>
                            </table>
                            <div className="guideGoToBookBox">
                                <Link to='/searchcarlist'className="guideGoToBook"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>예약하러가기</Link>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}