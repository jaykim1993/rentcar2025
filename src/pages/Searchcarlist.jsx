import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/Datacontext";
import { CalendarContext } from "../contexts/Calendarcontext";
import './Searchcarlist.css'
import { Link } from "react-router-dom";
import Calendar from './Calendar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Recentcar(){

    // const { cars } = useContext(DataContext);
    const { availableCars,setLocation, location, startDate, endDate ,startTime, endTime, apply, handleSearchBtn } = useContext(CalendarContext);

    // ================= 달력 관련 =================

    // 지점 모달 toggle
    const [isLocation, setIsLocation] = useState(false);
    // 달력 모달 toggle
    const [iscalendar, setIscalendar] = useState(false);

    const calendarHandler=()=>{
      setIscalendar(!iscalendar);
      setIsLocation(false);
    };
    const locationHandler=()=>{
      setIscalendar(false);
      setIsLocation(!isLocation);
    };

    // 오전 오후
    const timeAMPM= (time)=>{
      const hours=Number(time.slice(0,2));
      const minutes=time.slice(3);
      const ampm= hours<12 ?'오전':'오후';
      return ` ${ampm} ${hours}:${minutes}`;
    }

    // 지점 상세보기 모달
    const [isDetail,setIsDetail]=useState(null);
    // console.log('번호: ',isDetail);

    // 여러 좌표를 배열로 관리  각 데이터에있는 주소 위도,경도 검색 후 삽입
  const positions = [
    {id:1, lat: 37.446842, lng: 126.454047, name: "인천공항점" , address: "인천광역시 중구 공항로 271" },
    {id:2, lat: 37.56517, lng: 126.803013, name: "김포공항점" , address: "서울특별시 강서구 하늘길 38"},
    {id:3, lat: 37.570097, lng: 127.064886, name: "서울동부점", address: "서울 동대문구 한천로 100 1-2층" },
    {id:4, lat: 37.493788, lng: 127.012596, name: "서울남부점", address: "서울특별시 서초구 서초대로 283" },
    {id:5, lat: 37.653579, lng: 127.058793, name: "서울북부점", address: "서울 노원구 노해로 456 동방빌딩 1층"},
  ];
  
  const detail=positions.find(item => item.id === isDetail);
  
  let detail_lat=detail?.lat;
  let detail_lng=detail?.lng;
  

  useEffect(()=>{
    setIsDetail(null);
  },[isLocation]);

    // ================= 옵션 문자열 =================
    // const getActiveOptionsString = (car) => {
    //     const activeOptions = [];
    //     if (car.navigation) activeOptions.push('내비게이션');
    //     if (car.rear_camera) activeOptions.push('후방카메라');
    //     if (car.heated_seat) activeOptions.push('열선시트');
    //     if (car.heated_handle) activeOptions.push('핸들열선');
    //     if (car.bluetooth) activeOptions.push('블루투스');
    //     if (car.smart_key) activeOptions.push('스마트키');
    //     if (car.sun_loof) activeOptions.push('썬루프');
    //     return activeOptions.join(', ');
    // };

    // ================= 필터 판별 =================
    const filterCar = (car, filters) => {

        for (const category in filters) {
            const selectedValues = filters[category];
            if (selectedValues.length === 0) continue;

            // 차종 / 연료 / 제조사
            if (category === 'carSize' && !selectedValues.includes(car.car_size)) return false;
            if (category === 'fuelType' && !selectedValues.includes(car.fuel_type)) return false;
            if (category === 'brand' && !selectedValues.includes(car.brand)) return false;

            // 옵션 (AND 조건)
            if (category === 'option') {
                for (let i = 0; i < selectedValues.length; i++) {
                    const opt = selectedValues[i];

                    if (opt === '내비게이션' && !car.navigation) return false;
                    if (opt === '후방카메라' && !car.rear_camera) return false;
                    if (opt === '열선시트' && !car.heated_seat) return false;
                    if (opt === '핸들열선' && !car.heated_handle) return false;
                    if (opt === '블루투스' && !car.bluetooth) return false;
                    if (opt === '스마트키' && !car.smart_key) return false;
                    if (opt === '썬루프' && !car.sun_loof) return false;
                }
            }
        }

        return true;
    };

    // ================= 상태 =================
    const [selectedFilters, setSelectedFilters] = useState({
        carSize: [],
        fuelType: [],
        brand: [],
        option: []
    });

    const [displayedCars, setDisplayedCars] = useState(availableCars);

    /* 달력 조건 바뀌면 목록 초기화 */
    useEffect(() => {
        setDisplayedCars(availableCars);
    }, [availableCars]);

    // ================= 필터 적용 =================
    const updateDisplayedCars = (filters) => {
        const filtered = availableCars.filter(car => filterCar(car, filters));
        setDisplayedCars(filtered);
    };

    const toggleFilter = (category, value) => {
        const current = selectedFilters[category];
        const next = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        const newFilters = {
            ...selectedFilters,
            [category]: next
        };

        setSelectedFilters(newFilters);
        updateDisplayedCars(newFilters);
    };

    const removeSingleValueFilter = (category, value) => {
        const next = selectedFilters[category].filter(v => v !== value);
        const newFilters = { ...selectedFilters, [category]: next };
        setSelectedFilters(newFilters);
        updateDisplayedCars(newFilters);
    };

    const resetFilters = () => {
        const empty = { carSize: [], fuelType: [], brand: [], option: [] };
        setSelectedFilters(empty);
        setDisplayedCars(availableCars);
    };

    // ================= 그룹화 =================
    const groupedCars = {};
    for(const car of displayedCars){
        if (!groupedCars[car.model]) groupedCars[car.model] = [];
        groupedCars[car.model].push(car);
    }

    // ================= 선택 태그 =================
    const renderSelectedFilters = () => {
        const result = [];
        for (const category in selectedFilters) {
            for (const value of selectedFilters[category]) {
                result.push(
                    <button key={`${category}-${value}`} onClick={() => removeSingleValueFilter(category, value)}>
                        {value} ×
                    </button>
                );
            }
        }
        return result;
    };

    const shouldShowResetButton = () => {
        for(const key in selectedFilters) {
            if(selectedFilters[key].length > 0) return true;
        }
        return false;
    };

    // ================= 금액 =================
    const calculatePrice = (car) => {
        const basePrice = 3000;  // 기본요금
        let totalPrice = basePrice;  // 값이 담길 변수
    
        // 연식
        const baseModelYear = car.model_year;
    
        if(baseModelYear === 2022){
            totalPrice -= 200;
        }else if(baseModelYear === 2023){
            totalPrice -= 100;
        }else if(baseModelYear === 2025){
            totalPrice += 200;
        }else{
            totalPrice += 0;
        }
    
        // 크기
        const baseVehicleSize = car.car_size;
    
        if(baseVehicleSize === '중형'){
            totalPrice += 100;
        }else if(baseVehicleSize === '대형'){
            totalPrice += 200;
        }else{
            totalPrice += 0;
        }
    
        // 연료
        const baseFuelType = car.fuel_type;
    
        if(baseFuelType === '휘발유'){
            totalPrice += 100;
        }else if(baseFuelType === '하이브리드'){
            totalPrice += 200;
        }else{
            totalPrice += 0;
        }
    
        // 옵션
        if(car.heated_seat){ totalPrice += 100; }
        if(car.heated_handle){ totalPrice += 100; }
        if(car.sun_loof){ totalPrice += 200; }
        else{ null }
    
        // 브랜드별 값
        const priceValue = car.price_value;
    
        // 최종 산출금액
        const finalPrice = Math.round(totalPrice * priceValue);

        return finalPrice;

        
    }

    // ================= 출력 =================
    const renderGroupedCars = () => {
        const result = [];
        
        for(const modelName in groupedCars){
            const group = groupedCars[modelName];
            const first = group[0];
            result.push(
                <li key={modelName} className="grouped_car_item">
                    <Link to={`/detailpage/${first.id}`} style={{textDecoration:'none'}}>
                        <div>
                            <img className="brands" src={`images/brands/${first.brand_logo}`} />
                            <img className="cars" src={`images/cars/${first.car_img}`} alt={`${first.brand} ${first.model}`} />
                        </div>

                        <div className="car_list_ul">
                            {group.map((car, index) => {
                                const car_price = calculatePrice(car)
                                return(
                                    <div key={car.id} className={`car_variant_info ${index !== group.length - 1 ? 'Line_active' : ''}`}>
                                        <h4>{modelName} {car.fuel_type}</h4>
                                        <p>{car.model_year}년식 · {car.car_size} · {car.car_type}</p>
                                        {/* <p>{getActiveOptionsString(car)}</p> */}
                                        <i className="bi bi-chevron-right"></i>
                                        <p className="carPrice">시간당&nbsp;<strong>{car_price.toLocaleString()}</strong>원</p>
                                    </div>
                                )
                            })}
                        </div>
                    </Link>
                </li>
            );
        }

        return result;
    };

    return(
        <div className="Recentcar">
            {/* 카테고리 */}
            <div className="R_category">
                <ul>
                    <li>
                        <h3>차종/차량등급</h3>
                        {/* 다중 선택 토글 기능 적용 */}
                        <div className="cateBtn">
                            <button 
                                onClick={() => toggleFilter('carSize', '경소형')} 
                                className={selectedFilters.carSize.includes('경소형') ? 'active' : ''}>
                                경소형
                            </button>
                            <button 
                                onClick={() => toggleFilter('carSize', '중형')} 
                                className={selectedFilters.carSize.includes('중형') ? 'active' : ''}>
                                중형
                            </button>
                            <button 
                                onClick={() => toggleFilter('carSize', '대형')} 
                                className={selectedFilters.carSize.includes('대형') ? 'active' : ''}>
                                대형
                            </button>
                        </div>
                    </li>
                    <li>
                        <h3>연료</h3>
                         {/* 다중 선택 토글 기능 적용 */}
                        <div className="cateBtn">
                            <button 
                                onClick={() => toggleFilter('fuelType', '하이브리드')}
                                className={selectedFilters.fuelType.includes('하이브리드') ? 'active' : ''}>
                                하이브리드
                            </button>
                            <button 
                                onClick={() => toggleFilter('fuelType', '경유')}
                                className={selectedFilters.fuelType.includes('경유') ? 'active' : ''}>
                                경유
                            </button>
                            <button 
                                onClick={() => toggleFilter('fuelType', '휘발유')}
                                className={selectedFilters.fuelType.includes('휘발유') ? 'active' : ''}>
                                휘발유
                            </button>
                        </div>
                    </li>
                    <li>
                        <h3>제조사</h3>
                        <h4>국산차</h4>
                         {/* 다중 선택 토글 기능 적용 */}
                        <div className="cateBtn">
                            <button 
                                onClick={() => toggleFilter('brand', '쉐레보')}
                                className={selectedFilters.brand.includes('쉐레보') ? 'active' : ''}>
                                <img src="images/brands/CHEVROLET.png" alt="쉐레보" />
                                &nbsp;쉐레보
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '제네러스')}
                                className={selectedFilters.brand.includes('제네러스') ? 'active' : ''}>
                                <img src="images/brands/GENESIS.png" alt="제네러스" />
                                &nbsp;제네러스
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '한대')}
                                className={selectedFilters.brand.includes('한대') ? 'active' : ''}>
                                <img src="images/brands/HYUNDAI.png" alt="한대" />
                                &nbsp;한대
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', 'KGB')}
                                className={selectedFilters.brand.includes('KGB') ? 'active' : ''}>
                                <img src="images/brands/KGM.png" alt="KGB" />
                                &nbsp;KGB
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '크아')}
                                className={selectedFilters.brand.includes('크아') ? 'active' : ''}>
                                <img src="images/brands/KIA.png" alt="크아" />
                                &nbsp;크아
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '라노')}
                                className={selectedFilters.brand.includes('라노') ? 'active' : ''}>
                                <img src="images/brands/RENAULT-KOREA.png" alt="라노" />
                                &nbsp;라노
                            </button>
                        </div>
                        <h4>수입차</h4>
                        <div className="cateBtn">
                            <button 
                                onClick={() => toggleFilter('brand', '아우디즈')}
                                className={selectedFilters.brand.includes('아우디즈') ? 'active' : ''}>
                                <img src="images/brands/AUDI.png" alt="아우디즈" />
                                아우디즈
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '빈츠')}
                                className={selectedFilters.brand.includes('빈츠') ? 'active' : ''}>
                                <img src="images/brands/BENZ.png" alt="빈츠" />
                                빈츠
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', 'BMW')}
                                className={selectedFilters.brand.includes('BMW') ? 'active' : ''}>
                                <img src="images/brands/BMW.png" alt="dmw" />
                                dmw
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', 'BYD')}
                                className={selectedFilters.brand.includes('BYD') ? 'active' : ''}>
                                <img src="images/brands/BYD.png" alt="BYD" />
                                BYD
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '푸도')}
                                className={selectedFilters.brand.includes('푸도') ? 'active' : ''}>
                                <img src="images/brands/FORD.png" alt="푸도" />
                                푸도
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '렉사드')}
                                className={selectedFilters.brand.includes('렉사드') ? 'active' : ''}>
                                <img src="images/brands/LEXUS.png" alt="렉사드" />
                                렉사드
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '테셀라')}
                                className={selectedFilters.brand.includes('테셀라') ? 'active' : ''}>
                                <img src="images/brands/TESLA.png" alt="테셀라" />
                                테셀라
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '토유')}
                                className={selectedFilters.brand.includes('토유') ? 'active' : ''}>
                                <img src="images/brands/TOYATA.png" alt="토유" />
                                토유
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '복스바그')}
                                className={selectedFilters.brand.includes('복스바그') ? 'active' : ''}>
                                <img src="images/brands/VOLKSWAGEN.png" alt="복스바그" />
                                복스바그
                            </button>
                            <button 
                                onClick={() => toggleFilter('brand', '볼바즈')}
                                className={selectedFilters.brand.includes('볼바즈') ? 'active' : ''}>
                                <img src="images/brands/VOLVO.png" alt="볼바즈" />
                                볼바즈
                            </button>
                        </div>
                    </li>
                    <li>
                        <h3>옵션</h3>
                        <div className="cateBtn">
                            <button 
                                onClick={() => toggleFilter('option', '내비게이션')}
                                className={selectedFilters.option.includes('내비게이션') ? 'active' : ''}>
                                내비게이션
                            </button>
                            <button 
                                onClick={() => toggleFilter('option', '후방카메라')}
                                className={selectedFilters.option.includes('후방카메라') ? 'active' : ''}>
                                후방카메라
                            </button>
                            <button 
                                onClick={() => toggleFilter('option', '열선시트')}
                                className={selectedFilters.option.includes('열선시트') ? 'active' : ''}>
                                열선시트
                            </button>
                            <button 
                                onClick={() => toggleFilter('option', '핸들열선')}
                                className={selectedFilters.option.includes('핸들열선') ? 'active' : ''}>
                                핸들열선
                            </button>
                            <button 
                                onClick={() => toggleFilter('option', '블루투스')}
                                className={selectedFilters.option.includes('블루투스') ? 'active' : ''}>
                                블루투스
                            </button>
                            <button 
                                onClick={() => toggleFilter('option', '스마트키')}
                                className={selectedFilters.option.includes('스마트키') ? 'active' : ''}>
                                스마트키
                            </button>
                            <button 
                                onClick={() => toggleFilter('option', '썬루프')}
                                className={selectedFilters.option.includes('썬루프') ? 'active' : ''}>
                                썬루프
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            {/* 목록 */}
            <div className="R_carlist">
                <div className="cate_choice">
                    <div className="cate_Btn">
                        {renderSelectedFilters()}
                    </div>
                    {shouldShowResetButton() && (
                        <div className="delBtn">
                            <button onClick={resetFilters}>
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>
                    )}
                </div>
                {/* 날짜 / 지점 선택 창 */}
                <div className="R_reservation">
                    {/* 예약 섹션 */}
                        {/* 지점 선택 파트 */}
                            <div className="R_spotTable">
                                <div className="spot_choice">
                                    <p>어디?</p>
                                    <div className="R_spotTitle" onClick={locationHandler}>{location? <p>{location}</p> :<h2>지점선택</h2>}</div>
                                </div>
                            </div>
                            <div className="R_dateReservation">
                                <div className="R_dateTable">
                                      <p>언제?</p>
                                      <div className="R_dateTitle" onClick={calendarHandler}>
                                        {apply?<p>
                                         {startDate &&`${startDate}${timeAMPM(startTime)}`} ~ {endDate &&`${endDate}${timeAMPM(endTime)}`}
                                        </p>:
                                        <h2>날짜선택</h2>}
                                      </div>
                                </div>
                            </div>
                            <div className="searchButton">  
                                <button className="R_find_btn" type="submit" onClick={()=>handleSearchBtn(navigate)}>
                                    예약할 차량 찾기
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                                <button className="R_X_btn" type="submit" onClick={()=>handleSearchBtn(navigate)}>
                                    초기화
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                    {/* 지점 모달 파트 */}
                    {isLocation && (
                      <div className="R_location">
                        <span className="R_close01" onClick={()=>setIsLocation(false)}><i className="bi bi-x-lg"></i></span>
                        {/* 상세 위치 (지도) */}
                        {isDetail ? (
                          <>
                            <div className="R_selectLocation_detail">
                    
                              <MapContainer center={[detail_lat, detail_lng]} zoom={20} style={{ height: "300px", width: "394px"}}> 
                                <TileLayer
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                                />
                                {/* positions 배열을 map으로 돌면서 여러 Marker 렌더링 */}
                                {positions.map((spot) => (
                                  <Marker key={spot.id} position={[spot.lat, spot.lng]}>
                                    <Popup>{spot.name}</Popup>
                                  </Marker>
                                ))}
                              </MapContainer>
                              <h5>{detail.name}</h5>
                              <p className="R_detial_address_title">주소</p>
                              <span className="R_detial_address">{detail.address}</span>
                            </div>
                            
                          </>
                        ) : (
                        // 지점 목록 
                          <>
                            <h3>지점을 선택하세요</h3>
                            <div className="R_selectLocation">
                              <span>서울</span>
                              <div className="R_seoul">
                                <div className="R_gu">
                                  <p onClick={()=>setLocation("서울북부")}>
                                    서울 북부 <span>노원구</span>
                                  </p>
                                  <button className="R_detail" onClick={()=>setIsDetail(5)}>상세</button>
                                </div>
                    
                                <div className="R_gu">
                                  <p onClick={()=>setLocation("서울남부")}>
                                    서울 남부 <span>서초구</span>
                                  </p>
                                  <button className="R_detail" onClick={()=>setIsDetail(4)}>상세</button>
                                </div>
                    
                                <div className="R_gu">
                                  <p onClick={()=>setLocation("서울동부")}>
                                    서울 동부 <span>동대문구</span>
                                  </p>
                                  <button className="R_detail" onClick={()=>setIsDetail(3)}>상세</button>
                                </div>
                              </div>
                    
                              <span>김포</span>
                              <div className="R_gimpo">
                                <div className="R_gu">
                                  <p onClick={()=>setLocation("김포공항")}>
                                    김포공항 <span>강서구</span>
                                  </p>
                                  <button className="R_detail" onClick={()=>setIsDetail(2)}>상세</button>
                                </div>
                              </div>
                    
                              <span>인천</span>
                              <div className="R_gu">
                                <p onClick={()=>setLocation("인천공항")}>
                                  인천공항 <span>서초구</span>
                                </p>
                                <button className="R_detail" onClick={()=>setIsDetail(1)}>상세</button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    <div className={`calendar-slide ${iscalendar ? "open" : ""}`}>
                        <span className="R_close02" onClick={()=>setIscalendar(false)}><i className="bi bi-x-lg"></i></span>
                        <Calendar />
                    </div>
                </div>
                <h4>총 {displayedCars.length}대</h4>
                <ul>
                    {renderGroupedCars()}
                </ul>
            </div>
        </div>
    );
}
