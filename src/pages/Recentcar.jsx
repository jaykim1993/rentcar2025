import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../contexts/Datacontext";

export default function Recentcar(){

    const {cars} = useContext(DataContext);


    // const {cars} = useContext()
    // const [carlist,setCarlist]=useState();

    const carlistCopy=[...cars];
    console.log(carlistCopy);

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
        }
    };

    return(
        <div>
            <ul>
                {newCar.map((item)=>(
                    <li key={item.id}>
                        {item.model}
                    </li>
                ))}
            </ul>
        </div>
    )
}




