import { FormEvent, useState } from "react";
import {Car, FuelType,FuelTypeMap,BodyType,BodyTypeMap } from "../interfaces/Car";
import axios from "axios";
import "./styles/Form.css"
export default function CarCreateForm(){
    
    const [car,setCar] = useState<Car | null>(null)
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const [error,setError] = useState<string | null>(null);

    const bodyTypeArray:Array<number> = []
    for(const key in BodyTypeMap){
        bodyTypeArray.push(Number(key));
    }
    const fuelTypeArray:Array<number> = []
    for(const key in FuelTypeMap){
        fuelTypeArray.push(Number(key));
    }
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        console.log(formData);

        axios.post("http://localhost:5257/api/cars",
            {
                brand: formData.get("brandName") as string,
                model: formData.get("modelName") as string,
                doorsNumber: parseInt(formData.get("doorsNumber") as string),
                luggageCapacity: parseInt(formData.get("luggageCapacity") as string),
                engineCapacity: parseInt(formData.get("engineCapacity") as string),
                fuelType: parseInt(formData.get("fuelType") as string),
                productionDate:formData.get("productionDate") as string,
                carFuelConsumption: parseFloat(formData.get("fuelConsumption") as string),
                bodyType:parseInt(formData.get("bodyType") as string)
        })
        .then(response =>{
            console.log(response.data);
        })
        .catch(error =>{
            const errorlist = error.response.data.errors;
            console.log(errorlist);
        })
        .finally(() =>{
            setIsLoading(false);            
        })
    }
    


    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <p>Brand name</p>
                <input type="text" name="brandName" required title="Brand name"/>
                <p>Model name</p>
                <input type="text" name="modelName" required title="Model name"/>
                <p>Number of doors</p>
                <input type="number" name="doorsNumber" required title="Number of doors"/>
                <p>Luggage capacity</p>
                <input type="number" name="luggageCapacity" required title="Luggage capacity"/>
                <p>Engine capacity</p>
                <input type="number" name="engineCapacity" required title="Engine capacity"/>
                <p>Fuel type</p>
                <select required name="fuelType">
                    {fuelTypeArray.map((key) =>{
                      return <option key={key} value={key}>{FuelTypeMap[key]}</option>  
                    })}
                </select>
                <p>Fuel Consumption</p>
                <input type="text" name="fuelConsumption" required title="Fuel Consumption"/>
                <p>Date of production</p>
                <input type="date" name="productionDate" required title= "Date of production"/>
                <p>Body Type</p>
                <select required name="bodyType">
                {bodyTypeArray.map((key) =>{
                    return <option key={key} value={key}>{BodyTypeMap[key]}</option>;
                })}
                </select>
                <input type="submit" value={"Create a car"}/>
            </form>
        </div>

    );
}