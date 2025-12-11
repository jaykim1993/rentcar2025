import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../contexts/Datacontext";
import { CalendarContext } from "../contexts/calendarcontext";

import './Searchcarlist.css'

export default function Recentcar(){

    const {cars} = useContext(DataContext);
    const {rentOk} = useContext(CalendarContext);


// True, False 박는 용도!

    const carlistCopy = [...cars];
    console.log(carlistCopy);

    // 렌트 가능/불가능 옵션을 t/f로 추가
    // const rentOk=()=>{
    //     const newRentOk=carlistCopy.map(item=>({
    //         carlistCopy,
    //         canRent: true
    //     }));
    //     setCarlist(newRentOk);
    // }

    const newCar = cars.map(item=>({...item, carRent:true}));

    for(let i=1; i<newCar.length; i++){
        if(i%18 === 0){
            newCar[i].carRent=false;
            // console.log('false인 차',newCar[i]);
        }
        
    };
    // const rentNo=[];

    // 선택한 날짜 = 해당 날짜에 이미 예약된 차량 출력
    // for(let i=0; i<Booking.length; i++){
    //     if(timeInfo[0] && timeInfo[0].start == Booking[i].date){
    //         rentNo.push(Booking[i].car_id);
    //         console.log(timeInfo[0].start,rentNo);
            
    //     }
        
    // }

    

    // 옵션
    // const optionsName = {
    //     navigation: '내비게이션',
    //     rear_camera: '후방카메라',
    //     heated_seat: '열선시트',
    //     heated_handle: '핸들열선',
    //     bluetooth: '블루투스',
    //     smart_key: '스마트키',
    //     sun_loof: '썬루프'
    // }

    // 차종별 옵션 나누기
    const groups = {};

    newCar.forEach(item => {
        const key = `${item.car_img}_${item.model}`;
        if (!groups[key]) {
            groups[key] = {
            car_img: item.car_img,
            model: item.model,
            options: []
        };
    }

    groups[key].options.push({
    color: item.color,
    fuel_type: item.fuel_type,
    navigation: item.navigation,
    rear_camera: item.rear_camera
    });
    });


    const groupedCars = Object.keys(groups).map(key => groups[key]);


    return(
        <div className="Recentcar">
            {/* 카테고리 */}
            <div className="R_category">
                <ul>
                    <li>
                        <h3>차종/차량등급</h3>
                        <div className="cateBtn">
                            <button>경소형</button>
                            <button>소형</button>
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
                        <h3>운전자 조건</h3>
                        <h4>나이</h4>
                        <div className="cateBtn">
                            <button>만 21세 이상</button>
                            <button>만 23세 이상</button>
                        </div>
                    </li>
                    <li>
                        <h3>제조사</h3>
                        {/* 국산 */}
                        <h4>국산차</h4>
                        <div className="cateBtn">
                            {/* <div className="kr_cars"> */}
                            <button>
                                <img src="images/brands/CHEVROLET.png" alt="쉐레보" />
                                쉐레보
                            </button>
                            <button>
                                <img src="images/brands/GENESIS.png" alt="제네러스" />
                                제네러스
                            </button>
                            <button>
                                <img src="images/brands/HYUNDAI.png" alt="한대" />
                                한대
                            </button>
                            <button>
                                <img src="images/brands/KGM.png" alt="KGB" />
                                KGB
                            </button>
                            <button>
                                <img src="images/brands/KIA.png" alt="크아" />
                                크아
                            </button>
                            <button>
                                <img src="images/brands/RENAULT-KOREA.png" alt="라노" />
                                라노
                            </button>
                            {/* </div> */}
                        </div>
                        {/* 수입 */}
                        <h4>수입차</h4>
                        <div className="cateBtn">
                            {/* <div className="int_cars"> */}
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
                            {/* </div> */}
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
{/* sp! */}
            {/* 목록 */}
            <div className="R_carlist">
                <ul>
                    {/* {newCar.map((item)=>(
                        <li key={item.id}>
                            <div className="R_listInfo">
                                <img src={`/images/brands/${item.brand_logo}`} alt={item.brand} className="R_brands" />
                                <img src={`/images/cars/${item.car_img}`} alt={item.model} className="R_cars" />
                                <p>{item.model_year}년식</p>
                                <h2>{item.model}</h2>
                            </div>
                            <div className="R_listOptions">
                                <h4>옵션</h4>
                                {item.navigation && <span>내비게이션 </span>}
                                {item.rear_camera && <span>후방카메라 </span>}
                                {item.heated_seat && <span>열선시트 </span>}
                                {item.heated_handle && <span>열선핸들 </span>}
                                {item.bluetooth && <span>블루투스 </span>}
                                {item.smart_key && <span>스마트키 </span>}
                                {item.sun_loof && <span>썬루프</span>}
                            </div>
                        </li>
                    ))} */}
                    {groupedCars.map((car, idx) => (
                        <div className="car_group" key={idx}>
                            <div className="car_left">
                                <img src={`./images/cars/${car.car_img}`} alt={car.model} />
                                <h3>{car.model}</h3>
                            </div>
                            <div className="car_right">
                                {car.options.map((opt, index) => (
                                <div className="option_block" key={index}>
                                <p>color: {opt.color}</p>
                                <p>fuel_type: {opt.fuel_type}</p>
                                <p>navigation: {String(opt.navigation)}</p>
                                <p>rear_camera: {String(opt.rear_camera)}</p>
                                <hr />
                            </div>
                            ))}
                            </div>
                        </div>
                        ))}
                </ul>
            </div>
        </div>
    )
}




