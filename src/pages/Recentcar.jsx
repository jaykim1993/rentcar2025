import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../contexts/Datacontext";
import { Calendercontext } from "../contexts/Calendercontext";

export default function Recentcar(){

    const {cars} = useContext(DataContext);
    const {rentOk} = useContext(Calendercontext);


// True, False 박는 용도

    // const carlistCopy=[...cars];
    // console.log(carlistCopy);

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

    

    return(
        <div>
            <ul>
                {rentOk && rentOk.map((item)=>(
                    <li key={item.id}>
                        {item.model}-
                    </li>
                ))}
            </ul>
        </div>
    )
}




