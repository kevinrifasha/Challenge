import { useState,useEffect } from 'react'
import Table from "react-bootstrap/Table"

import ProductRow from '../components/ProductRow';
import useFetch from '../hooks/useFetch';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../helpers/fetch';
import { FETCH_PRODUCTS, fetchProduct } from '../store/actions/actionCreator';

function ProductPage() {
    // const {data, isLoading, error} = useFetch("/Item")
    // const [isLoading, setLoading] = useState(true)
    // const [error, setError] = useState("")

    const dispatch = useDispatch()

    const products = useSelector((state) => state.products.products)

    useEffect(() => {
        // setLoading(true)
        // fetch("http://localhost:3000/Item", {
        //     method: "get"
        // })
        //     .then((res) => {
        //         if (!res.ok) {
        //             throw new Error("Error")
        //         }
        //         return res.json()
        //     })
        //     .then((data) => {
        //         dispatch({
        //             type: "products/fetch",
        //             payload: data
        //         })
        //     })
        //     .catch((error) => {
        //         setError(error)
        //         console.log(error)
        //     })
        //     .finally(() => {
        //         setLoading(false)
        //     })
        if (products.length === 0) {
            dispatch(fetchProduct("/products", FETCH_PRODUCTS))
        }
    },[])

    if (products.length === 0) {
        return (
            <>
            <h1 className="text-center mb-4">Product List</h1>
            <Link to="/product-add" className='px-5'>
                <button className="btn btn-primary mb-4">Add Product</button>
            </Link>
            <h2 className="text-center mb-4">Loading Data...</h2>
            <img 
            className='w-25 mx-auto d-flex'
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWV2c2ZkemF5YzRpdHpkazBnNTVhNTkxY2p3a2wydzNwOXFvOTRtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/uOuSIvIVRQoemjmPTz/giphy.gif" alt="" />
            </>
        )
    }

    // if (error) {
    //     return (
    //         <>
    //         <h1 className="text-center mb-4">Error</h1>
    //         <h2 className="text-center mb-4">Something went wrong</h2>
    //         </>
    //     )
    // }

    return (
        <>
            <h1 className="text-center mb-4">Product List</h1>
            <div className="px-5">
                <Link to="/product-add">
                    <button className="btn btn-primary mb-4">Add Product</button>
                </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th style={{width: "600px"}}>Description</th>
                        <th>Ingredients</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((el) => {
                        return <ProductRow 
                        key={el.id}
                        product={el}
                        />
                    })}
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default ProductPage
