import axios from "axios"
import { useEffect, useState } from "react";
import { Car } from "../interfaces/Car";
import "./Page.css"
import { NavLink } from "react-router-dom";

export default function CarsListPage(){

    const [cars,setCars] = useState<Car[]>([])
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const [error,setError] = useState<string | null>(null);
    
    function handleDelete(id: string | null){
        axios.delete(`http://localhost:5257/api/cars/${id}`)
        .then(()=>{
            alert("Car deleted!")
            fetchCars();
        })
        .catch(error=>{
            console.error(error);
        })
        
    }

    function fetchCars(){
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
    }

    useEffect(()=>{
        fetchCars();
    },[]);
    return(
        <>
        <h1>Car list</h1>
        <ul>
            {
                cars.map(car =>(
                    <div>
                        <NavLink style={{color:"black",textDecoration:"none"}} key={car.id} to={`${car.id}`}>
                        <li>
                            {`${car.brand}`}
                        </li>
                        </NavLink>
                        <button onClick={()=> handleDelete(car.id)}>Delete</button>
                    </div>

                ))
            }
        </ul>
        </>


    );
}