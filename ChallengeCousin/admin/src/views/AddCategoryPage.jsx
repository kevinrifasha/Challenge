import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FETCH_CATEGORIES, FETCH_SINGLE_CATEGORY, fetchProduct, sendData } from "../store/actions/actionCreator"
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from "../store";

function AddCategoryPage() {
    const {id} = useParams()
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleSubmitCategory(event) {
        try {
            event.preventDefault()
            // console.log(name)
            if (id) {
                // const response = await fetch(`http://localhost:3000/categories/${id}`, {
                //     method: "put",
                //     body: JSON.stringify({name}),
                //     headers: {
                //         access_token: localStorage.access_token,
                //         "Content-Type": "application/json"
                //     }
                // })

                // const data = await response.json();
                // if (!response.ok) {
                //     throw new Error(data)
                // }
                await dispatch(sendData(`/categories/${id}`, "put", {name}))
                toast.success("Category has been edited")
            } else {
                // const response = await fetch("http://localhost:3000/categories", {
                //     method: "post",
                //     body: JSON.stringify({name}),
                //     headers: {
                //         access_token: localStorage.access_token,
                //         "Content-Type": "application/json"
                //     }
                // })
                // const data = await response.json();
                // if (!response.ok) {
                //     throw new Error(data)
                // }

                await dispatch(sendData("/categories", "post", {name}))
                toast.success("Category has been created")
            }
            await dispatch(fetchProduct("/categories", FETCH_CATEGORIES))
            navigate("/categories")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(`/categories/${id}`, FETCH_SINGLE_CATEGORY))
                .then(() => {
                    setName(store.getState().categories.categorySingle.name)
                })
        } 
    },[])

    return (
        <Form 
        onSubmit={handleSubmitCategory}
        className="w-50 m-auto">
            <h1 className="text-center">Add New Category</h1>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                onChange={(event)=> {
                    setName(event.target.value)
                }}
                defaultValue={id ? name: ""}
                type="text" placeholder="Enter category name" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default AddCategoryPage
