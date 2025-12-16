import { useContext, useEffect, useState } from "react";
import AuthContext from "../providers/AuthProvider";
import api from "../api/api";

export default function RegisterForm(){

    const auth = useContext(AuthContext);
    if(!auth) throw new Error("AuthContext missing");


    const { setUser } = auth;
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string |  null>(null);
        
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData);

        api.post("/account/register",
            {
                userName:formData.get("userName") as string,
                displayName:formData.get("displayName") as string,
                email:formData.get("email") as string,
                password:formData.get("password") as string
            }
        )
        .then((response) =>{
            setUser(response.data);
            console.log(response.data);
        })
        .catch((error)=>{
            throw new Error(error)
        })
        .finally(()=>setIsLoading(false));

    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <p>
                    Display name
                </p>
                <input type="text" required name="displayName"/>
            </div>
            <div>
                <p>
                    User name / login
                </p>
                <input type="text" required name="userName"/>
            </div>
            <div>
                <p>
                    E-mail
                </p>
                <input type="email" required name="email"/>
            </div>
            <div>
                <p>
                    Password
                </p>
                <input type="password" required name="password"/>
            </div>
            <div>
            <p/>
            <input type="submit" value={"Register"}/>

            </div>
        </form>
    );
}