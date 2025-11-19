import { NavLink } from "react-router-dom";
import { Car } from "../interfaces/Car";
import CarTable from "../tables/CarTable";
import "./styles/CarDisplay.css";
export default function CarDisplay(props: {car:Car}){

    const car = props.car;
    return(
        <div className="car-display-container">
            <CarTable car = {car}/>
            <NavLink  to={`/cars/edit/${car.id}`}>Edit</NavLink>
        </div>

    )
}