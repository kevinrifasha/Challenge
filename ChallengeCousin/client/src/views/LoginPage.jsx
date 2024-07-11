import { useState } from "react";
import "./LoginPage.css"

import { Link } from "react-router-dom";

export default function LoginPage() {

    const [formInput, setFormInput] = useState({
        email: "",
        password: ""
    })
    
    function inputHandling(event) {
        const value = event.target.value;
        const field = event.target.name;
        setFormInput({
        ...formInput,
        [field]: value
        });
        // console.log(formInput)
    }

    function handleLogin(event) {
        try {
            event.preventDefault()
            console.log(formInput)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div id="login-form">
            <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <p>Login with an existing account</p>
            <p>Click <Link to={"/register"}>here</Link> to create a new account</p>

            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
            onChange={inputHandling}
            type="email" name="email" id="email" required />
            </div>

            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
            onChange={inputHandling}
            type="password" name="password" id="password" required/>
            </div>

            <div className="form-group ">
            <button className="pointer-hover grow">Login</button>
            </div>
            </form>
        </div>
        </>
    )
}