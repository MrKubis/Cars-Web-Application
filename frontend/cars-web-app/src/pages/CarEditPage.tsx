import { useEffect, useState } from "react";
import CarEditForm from "../components/CarEditForm";
import { NavLink, useParams } from "react-router-dom";
import { Car } from "../interfaces/Car";
import api from "../api/api";

export default function CarEditPage(){
    const [car,setCar] = useState<Car | null>(null)
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const [error,setError] = useState<string | null>(null);
        
    const params = useParams();
    console.log(params);

    useEffect(()=>{
        setIsLoading(true)
        api.get<Car>(`http://localhost:5257/api/cars/${params.id}`)
        .then(response =>{
            setCar(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    },[]);

    useEffect(()=>{console.log(car)},[car]);
    return(
        <>
            {car && <CarEditForm car={car}/>}
        </>
    );
}