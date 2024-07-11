import { useState } from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sendData } from "../store/actions/actionCreator";

export default function AddAdminPage() {
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
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    async function handleAddAdmin(event) {
        try {
            event.preventDefault()
            // const response = await fetch("http://localhost:3000/register", {
            //     method: "post",
            //     body: JSON.stringify(formInput),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // })
            // const data = await response.json();
            // if (!response.ok) {
            //     throw new Error(data)
            // }
            dispatch(sendData("/register", "post", formInput))
            toast.success("Admin has been added")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <Form 
        onSubmit={handleAddAdmin}
        className="w-50 m-auto">
            <h1 className="text-center">Add New Admin</h1>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                type="text" name="username" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                type="email" name="email" placeholder="Enter email" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                type="password" name="password" placeholder="Enter password" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                type="text" name="phoneNumber" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                type="text" name="address" placeholder="Enter address" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    )
}