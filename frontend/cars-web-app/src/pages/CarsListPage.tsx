import axios from "axios"
import { useEffect, useState } from "react";
import { Car } from "../interfaces/Car";
import "./Page.css"
import { NavLink } from "react-router-dom";

export default function CarsListPage(){

    const [cars,setCars] = useState<Car[]>([])
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const [error,setError] = useState<string | null>(null);
    
    useEffect(()=>{
        setIsLoading(true)
        axios.get<Car[]>('http://localhost:5257/api/cars')
        .then(response =>{
            setCars(response.data);
        })
        .catch(error =>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    },[]);
    return(
        <>
        <h1>Car list</h1>
        <ul>
            {
                cars.map(car =>(
                    <li>
                        <NavLink style={{textDecoration:"none"}} key={car.id} to={`${car.id}`}>
                            {car.id}
                        </NavLink>
                    </li>
                ))
            }
        </ul>
        </>


    );
}