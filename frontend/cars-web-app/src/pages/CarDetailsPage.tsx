import { useParams } from "react-router-dom";
import CarDisplay from "../components/CarDisplay";
import { useEffect, useState } from "react";
import { Car } from "../interfaces/Car";
import api from "../api/api";

export default function CarDetailsPage(){
    const [car,setCar] = useState<Car | null>(null)
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const [error,setError] = useState<string | null>(null);
        
    const params = useParams();
    console.log(params);

    useEffect(()=>{
        setIsLoading(true)
        api.get<Car>(`http://localhost:5257/api/cars/${params.id}`)
        .then(response =>{
            console.log(response.data)
            setCar(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    },[]);

    return(
        <>
            {car && <CarDisplay car = {car}/>}
        </>
    );
}