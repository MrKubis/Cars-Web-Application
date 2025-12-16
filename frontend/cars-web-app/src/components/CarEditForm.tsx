import { useState } from "react";
import { BodyTypeMap, Car, FuelTypeMap } from "../interfaces/Car";
import api from "../api/api";

export default function CarEditForm(props:{car:Car}){

    
    const [car, setCar] = useState<Car | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string |  null>(null);
    
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

        api.patch("http://localhost:5257/api/cars",
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
            console.log(response);
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
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div>
                    <p>Brand name</p>
                    <input type="text" name="brandName" required title="Brand name"/>
                </div>
                <div>
                    <p>Model name</p>
                    <input type="text" name="modelName" required title="Model name"/>
                </div>
                <div>
                    <p>Body Type</p>
                    <select required name="bodyType">
                    <option value="" selected disabled hidden></option>
                    {bodyTypeArray.map((key) =>{
                        return <option key={key} value={key}>{BodyTypeMap[key]}</option>;
                    })}
                    </select>
                </div>
                <div>
                    <p>Number of doors</p>
                    <input type="number" min={0} name="doorsNumber" required title="Number of doors"/>
                </div>
                <div>
                    <p>Luggage capacity</p>
                    <input type="number" min={0} name="luggageCapacity" required title="Luggage capacity"/>
                </div>
                <div>
                    <p>Engine capacity</p>
                    <input type="number" min={0} name="engineCapacity" required title="Engine capacity"/>
                </div>
                <div>
                    <p>Fuel type</p>
                    <select required name="fuelType">
                        <option value="" selected disabled hidden></option>
                        {fuelTypeArray.map((key) =>{
                        return <option key={key} value={key}>{FuelTypeMap[key]}</option>  
                        })}
                    </select>
                </div>
                <div>
                    <p>Fuel Consumption</p>
                    <input type="text" name="fuelConsumption" required title="Fuel Consumption"/>
                    
                </div>
                <div>
                    <p>Date of production</p>
                    <input type="date" name="productionDate" required title= "Date of production"/>
                                    
                </div>
            </div>
            <input type="submit" value={"Create a car"}/>                   

        </form>
        );
}