import { NavLink } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <>
            <p>Page was not found...</p>
            <NavLink to="/">Return to the car list</NavLink>
        </>

    );
}