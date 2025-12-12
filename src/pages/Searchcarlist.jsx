import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../contexts/Datacontext";
import { CalendarContext } from "../contexts/calendarcontext";

import './Searchcarlist.css'

export default function Recentcar(){
    // 원본배열
    const { cars } = useContext(DataContext);
    // 얕은복사
    const carsCopy = [...cars];


    // [BookedlistAll] 모든 회원의 과거 포함 모든 예약정보를 담고 있는 배열(실시간 추가도 가능)
    // 적용하기버튼핸들러에 들어가야할 기능=> 필터(17-19일)함수로 예약가능한 결과값을 추출  const dateFiltered -> 예약가능한 리스트 맵으로 뿌리기(령경 - 차량id를 공유받아서 carsCopy배열로 차량리스트 뽑기)
    // dateFiltered = [{userId, carId, filterStartDate, filterEndDate, filterStartTime, filterEndTime}]

    // 날짜 (문자열 -> 날짜형식으로 )
    // const start = new Date(time.start);
    // const end = new Date(time.end);
    // const term = (end - start) / (1000 * 60 * 60 * 24); //일수

    // 예약하기버튼핸들러 => 
    // BookedlistAll = [{bookDate, userId, carId, startDate, returnDate, rentalTerm, startTime, returnTime}]

    return(
        <div className="Recentcar">
            {/* 카테고리 */}
            <div className="R_category">
                <ul>
                    <li>
                        <h3>차종/차량등급</h3>
                        <div className="cateBtn">
                            <button>경/소형</button>
                            <button>중형</button>
                            <button>대형</button>
                        </div>
                    </li>
                    <li>
                        <h3>연료</h3>
                        <div className="cateBtn">
                            <button>하이브리드</button>
                            <button>경유</button>
                            <button>휘발유</button>
                        </div>
                    </li>
                    <li>
                        <h3>제조사</h3>
                        {/* 국산 */}
                        <h4>국산차</h4>
                        <div className="cateBtn">
                            <button>
                                <img src="images/brands/CHEVROLET.png" alt="쉐레보" />
                                &nbsp;쉐레보
                            </button>
                            <button>
                                <img src="images/brands/GENESIS.png" alt="제네러스" />
                                &nbsp;제네러스
                            </button>
                            <button>
                                <img src="images/brands/HYUNDAI.png" alt="한대" />
                                &nbsp;한대
                            </button>
                            <button>
                                <img src="images/brands/KGM.png" alt="KGB" />
                                &nbsp;KGB
                            </button>
                            <button>
                                <img src="images/brands/KIA.png" alt="크아" />
                                &nbsp;크아
                            </button>
                            <button>
                                <img src="images/brands/RENAULT-KOREA.png" alt="라노" />
                                &nbsp;라노
                            </button>
                        </div>
                        {/* 수입 */}
                        <h4>수입차</h4>
                        <div className="cateBtn">
                            <button>
                                <img src="images/brands/AUDI.png" alt="아우디즈" />
                                아우디즈
                            </button>
                            <button>
                                <img src="images/brands/BENZ.png" alt="빈츠" />
                                빈츠
                            </button>
                            <button>
                                <img src="images/brands/BMW.png" alt="dmw" />
                                dmw
                            </button>
                            <button>
                                <img src="images/brands/BYD.png" alt="BYD" />
                                BYD
                            </button>
                            <button>
                                <img src="images/brands/FORD.png" alt="푸도" />
                                푸도
                            </button>
                            <button>
                                <img src="images/brands/LEXUS.png" alt="렉사드" />
                                렉사드
                            </button>
                            <button>
                                <img src="images/brands/TESLA.png" alt="테셀라" />
                                테셀라
                            </button>
                            <button>
                                <img src="images/brands/TOYATA.png" alt="토유" />
                                토유
                            </button>
                            <button>
                                <img src="images/brands/VOLKSWAGEN.png" alt="복스바그" />
                                복스바그
                            </button>
                            <button>
                                <img src="images/brands/VOLVO.png" alt="볼바즈" />
                                볼바즈
                            </button>
                        </div>
                    </li>
                    <li>
                        <h3>옵션</h3>
                        <div className="cateBtn">
                            <button>내비게이션</button>
                            <button>후방카메라</button>
                            <button>열선시트</button>
                            <button>핸들열선</button>
                            <button>블루투스</button>
                            <button>스마트키</button>
                            <button>썬루프</button>
                        </div>
                    </li>
                </ul>
            </div>

            {/* 목록 */}
            <div className="R_carlist">
                {/* <h2>총 {}대</h2> */}
                {/* 카테고리 선택 후 표시부분 */}
                <div className="cate_choice">
                    <button>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <ul>
                </ul>
            </div>
        </div>
    )
}