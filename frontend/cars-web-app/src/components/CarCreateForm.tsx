import { FormEvent, useState } from "react";
import {Car, FuelType,FuelTypeMap,BodyType,BodyTypeMap } from "../interfaces/Car";
import "./styles/Form.css"
export default function CarCreateForm(){
    
    const [car,setCar] = useState<Car | null>(null)
    
    const bodyTypeArray:Array<number> = []
    for(const key in BodyTypeMap){
        bodyTypeArray.push(Number(key));
    }
    const fuelTypeArray:Array<number> = []
    for(const key in FuelTypeMap){
        fuelTypeArray.push(Number(key));
    }
    function handleSubmit() {
        console.log("Created!")
    }

    return(
        <div className="form-container">
            <form action={handleSubmit}>
                <p>Brand name</p>
                <input type="text" required title="Brand name"/>
                <p>Model name</p>
                <input type="text" required title="Model name"/>
                <p>Number of doors</p>
                <input type="number" required title="Number of doors"/>
                <p>Luggage capacity</p>
                <input type="number" required title="Luggage capacity"/>
                <p>Engine capacity</p>
                <input type="number" required title="Engine capacity"/>
                <p>Fuel type</p>
                <select required name="fuelType">
                    {fuelTypeArray.map((key) =>{
                      return <option key={key} value={key}>{FuelTypeMap[key]}</option>  
                    })}
                </select>
                <p>Fuel Consumption</p>
                <input type="number" required title="Fuel Consumption"/>
                <p>Date of production</p>
                <input type="date" required title= "Date of production"/>
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