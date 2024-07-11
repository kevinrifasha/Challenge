import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react"
import { json, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ToastContainer } from 'react-toastify';
import "./LoginPage.css"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault()
        try {
            // console.log(email, password)
            const obj = JSON.stringify({
                email: email,
                password: password
            })
            const response = await fetch("https://server.andikaraditya.cloud/login", {
                method: "post",
                body: obj,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw data
            }
            localStorage.setItem("access_token", data.access_token)
            navigate("/")
            toast.success("Login successfull")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div id="login-page" className="vh-100 ">
            <div className="w-100 h-100 d-flex">
                <Form 
                onSubmit={handleLogin}
                className="m-auto w-25 border border-2 rounded-3 p-3 bg-white">
                        <Form.FloatingLabel className="fs-2 fw-bold text-center bg-white">Login</Form.FloatingLabel>
                        <Form.FloatingLabel className="fs-4 text-center bg-white">Login with an existing account</Form.FloatingLabel>
                    <Form.Group className="mb-3 bg-white" controlId="formBasicEmail">
                        <Form.Label className="fs-5">Email address</Form.Label>
                        <Form.Control 
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3 bg-white" controlId="formBasicPassword">
                        <Form.Label className="fs-5">Password</Form.Label>
                        <Form.Control 
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                <ToastContainer />
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
