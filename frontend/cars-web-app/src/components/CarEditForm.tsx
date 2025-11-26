import { useEffect, useState } from "react";
import { BodyTypeMap, Car, FuelTypeMap } from "../interfaces/Car";
import axios from "axios";
import "./styles/Form.css"
export default function CarEditForm(props: {car:Car}){
    
    const [car,setCar] = useState<Car>(props.car);
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

        //patch
        axios.patch("http://localhost:5257/api/cars",
            {
                id:props.car.id,
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
    
    useEffect(()=>{
        setCar(props.car);
    },[])
    console.log(props.car.bodyType);
    return(
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div>
                        <p>Brand name</p>
                        <input type="text" name="brandName" required title="Brand name" defaultValue={car?.brand}/>
                    </div>
                    <div>
                        <p>Model name</p>
                        <input type="text" name="modelName" required title="Model name" defaultValue={car?.model}/>
                    </div>
                                                            <div>
                    <p>Body Type</p>
                        <select required name="bodyType" defaultValue={car?.bodyType}>
                        {bodyTypeArray.map((key) =>{
                            return <option key={key} value={key}>{BodyTypeMap[key]}</option>;
                        })}
                        </select>
                    </div>
                    <div>
                        <p>Number of doors</p>
                        <input type="number" name="doorsNumber" min={0} required title="Number of doors" defaultValue={car?.doorsNumber}/>
                    </div>
                    <div>
                        <p>Luggage capacity</p>
                        <input type="number" name="luggageCapacity" min={0} required title="Luggage capacity" defaultValue={car?.luggageCapacity}/>
                    </div>
                    <div>
                        <p>Engine capacity</p>
                        <input type="number" name="engineCapacity" min={0} required title="Engine capacity" defaultValue={car?.engineCapacity}/>
                    </div>
                    <div>
                        <p>Fuel type</p>
                        <select required name="fuelType" defaultValue ={car?.fuelType}>
                            {fuelTypeArray.map((key) =>{
                            return <option key={key} value={key}>{FuelTypeMap[key]}</option>  
                            })}
                        </select>
                    </div>

                    <div>
                        <p>Fuel Consumption</p>
                        <input type="text" name="fuelConsumption" required title="Fuel Consumption" defaultValue={car?.carFuelConsumption}/>
                    </div>
                    <div>

                        <p>Date of production</p>
                        <input type="date" name="productionDate" required title= "Date of production" defaultValue={car?.productionDate ? new Date(car.productionDate).toISOString().split("T")[0] : ""}/>
                    </div>

                    </div>
                <input type="submit" value={"Edit car"}/>

                </form>

            )
}