import { useState } from "react";
import "./RegisterPage.css"

import { Link } from "react-router-dom";

export default function RegisterPage() {

    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
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

    function handleRegister(event) {
        try {
            event.preventDefault()
            console.log(formInput)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div id="register-form">
            <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <p>Create new account</p>
            <p>Click <Link to={"/login"}>here</Link> to login an existing account</p>

            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
            onChange={inputHandling}
            type="text" name="username" id="username" required />
            </div>

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

            <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
            onChange={inputHandling}
            type="text" name="phoneNumber" id="phoneNumber"/>
            </div>

            <div className="form-group">
            <label htmlFor="address">Adress</label>
            <input 
            onChange={inputHandling}
            type="text" name="address" id="address"/>
            </div>

            <div className="form-group ">
            <button className="pointer-hover grow">Register</button>
            </div>
            </form>
        </div>
        </>
    )
}