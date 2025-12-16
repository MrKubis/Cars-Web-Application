import { useContext, useState } from "react"
import AuthContext from "../providers/AuthProvider";
import api from "../api/api";

export default function LoginForm(){
    
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

        api.post("http://localhost:5257/api/account/login",
        {
            email:formData.get("email") as string,
            password:formData.get("password") as string
        }
        )
        .then(response =>{
            setUser(response.data);
            console.log(response);
        })
        .catch(error =>{
            const errorList = error.response.data.errors;
            console.log(errorList);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <p>Email</p>
                <input type="email" required name="email"/>
            </div>
            <div>
                <p>Password</p>
                <input type="password" required name="password"/>
            </div>
            <div>
                <p></p>
                <input type="submit" value={"Log in"}/>

            </div>
        </form>
    )
}