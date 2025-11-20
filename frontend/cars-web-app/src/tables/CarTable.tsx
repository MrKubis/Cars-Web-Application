import { BodyTypeMap, Car, FuelTypeMap } from "../interfaces/Car";

export default function CarTable(props: {car:Car}){
    const car = props.car;
    return(
        <table>
            <tbody>
            <tr>
                <td>Id</td>
                <td>{car.id}</td>
            </tr>
            <tr>
                <td>Brand</td>
                <td>{car.brand}</td>
            </tr>
            <tr>
                <td>Model:</td>
                <td>{car.model}</td>
            </tr>
            <tr>
                <td>Number of doors</td>
                <td>{car.doorsNumber}</td>
            </tr>
            <tr>
                <td>Fuel Consumption</td>
                <td>{car.carFuelConsumption}</td>
            </tr>
            <tr>
                <td>Engine capacity</td>
                <td>{car.engineCapacity}</td>
            </tr>
            <tr>
                <td>Fuel type</td>
                <td>{FuelTypeMap[parseInt(car.fuelType)]}</td>
            </tr>
            <tr>
                <td>Luggage capacity</td>
                <td>{car.luggageCapacity}</td>
            </tr>

            <tr>
                <td>Production date</td>
                <td>{new Date(car.productionDate).toLocaleDateString()}</td>
            </tr>
            <tr>
                <td>Body Type</td>
                <td>{BodyTypeMap[parseInt(car.bodyType)]}</td>
            </tr>
            </tbody>
        </table>
    );
}