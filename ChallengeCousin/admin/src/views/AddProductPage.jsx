import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FETCH_PRODUCTS, FETCH_PRODUCT_DETAIL, FETCH_CATEGORIES, fetchProduct, sendData } from "../store/actions/actionCreator"
import { toast } from 'react-toastify';

import store from "../store";


function AddProductPage() {
    const navigate = useNavigate()

    const {id} = useParams()

    const dispatch = useDispatch()

    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        categoryId: 0
    })
    // let product = useSelector((state) => state.productDetail)
    let [product, setProduct] = useState({
        name: "",
        description: "",
        price: null,
        imgUrl: "",
        categoryId: null
    })
    const categories = useSelector((state) => state.categories.categories)

    function assignProduct() {
        return 
    }
    
    
    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(`/products/${id}`, FETCH_PRODUCT_DETAIL))
                .then(() => {
                    setProduct(store.getState().products.productDetail)
                })
        } else {
            // dispatch({type:CLEAR_PRODUCT_DETAIL})
        }

        if (categories.length === 0) {
            dispatch(fetchProduct("/categories", FETCH_CATEGORIES))
        }
    }, [])
    
    useEffect(() => {
        setFormInput(product)
    },[product])
    // async function getProduct() {
    //     try {
    //         const response = await fetch(`http://localhost:3000/Item/${id}`)
    //         const data = await response.json()
    //         setProduct(data)
    //         setFormInput(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    function inputHandling(event) {
        const value = event.target.value;
        const field = event.target.name;
        setFormInput({
        ...formInput,
        [field]: value
        });
        // console.log(formInput)
    }

    async function handleSubmitProduct(event) {
        try {
            event.preventDefault()
            if (id) {
                // console.log(formInput)
                // const response = await fetch(`http://localhost:3000/products/${id}`, {
                // method: "put",
                // body: JSON.stringify({item: formInput}),
                // headers: {
                //     access_token: localStorage.access_token,
                //     "Content-Type": "application/json"
                // }
                // })

                // const data = await response.json();
                // if (!response.ok) {
                //     throw new Error(data)
                // }
                await dispatch(sendData(`/products/${id}`, "put", {item: formInput}))
                toast.success("Product has been updated")
            } else {

                const {name, description, price, imgUrl, categoryId, ingredients1, ingredients2, ingredients3} = formInput

                let ingredients= [
                    {
                        name: ingredients1
                    },
                    {
                        name: ingredients2
                    },
                    {
                        name: ingredients3
                    },
                ]

                ingredients = ingredients.filter((el) => el.name ? true : false)

                const obj = {
                    item: {
                        name,
                        description,
                        price,
                        imgUrl,
                        categoryId
                    },
                    ingredients
                }

                // console.log(obj)

                // const response = await fetch("http://localhost:3000/products", {
                // method: "post",
                // body: JSON.stringify(obj),
                // headers: {
                //     access_token: localStorage.access_token,
                //     "Content-Type": "application/json"
                // }
                // })

                // const data = await response.json();
                // if (!response.ok) {
                //     throw new Error(data)
                // }

                await dispatch(sendData("/products", "post", obj))
                toast.success("Product has been created")
            }
            await dispatch(fetchProduct("/products", FETCH_PRODUCTS))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form 
        onSubmit={handleSubmitProduct}
        className="w-50 m-auto">
            <h1 className="text-center">Add New Product</h1>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                defaultValue={id ? product.name : ""}
                type="text" name="name" placeholder="Enter product name" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                defaultValue={id ? product.description : ""}
                as="textarea" name="description" placeholder="Enter product description" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                defaultValue={id ? product.price : ""}
                type="number" name="price" placeholder="Enter product price" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImg">
                <Form.Label>Image URL</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                defaultValue={id ? product.imgUrl : ""}
                type="text" name="imgUrl" placeholder="Enter image url" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Categories</Form.Label>
                <Form.Select 
                onChange={inputHandling}
                defaultValue={id ? product.categoryId : ""}
                name="categoryId" required>
                    <option value="">--Select Category--</option>
                    {categories.map((el) => {
                        return <option value={el.id} key={el.id}>{el.name}</option>
                    })}
                </Form.Select>
            </Form.Group>
            {id ? "" : <Form.Group className="mb-3">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control 
                onChange={inputHandling}
                className="mb-2"
                type="text" name="ingredients1" placeholder="Ingredients 1" />
                <Form.Control 
                onChange={inputHandling}
                className="mb-2"
                type="text" name="ingredients2" placeholder="Ingredients 2" />
                <Form.Control 
                onChange={inputHandling}
                className="mb-2"
                type="text" name="ingredients3" placeholder="Ingredients 3" />
            </Form.Group>}
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default AddProductPage
