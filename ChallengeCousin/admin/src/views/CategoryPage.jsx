import Table from "react-bootstrap/Table"
import CategoryRow from "../components/CategoryRow"
import { useState, useEffect } from "react"
import useFetch from "../hooks/useFetch"

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_CATEGORIES, fetchProduct } from "../store/actions/actionCreator";

function CategoryPage() {
    // const {data: categories, isLoading, error} = useFetch("/Category")

    const categories = useSelector((state) => state.categories.categories)

    const dispatch = useDispatch()

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchProduct("/categories", FETCH_CATEGORIES))
        }
    }, [])

    if (categories.length === 0) {
        return (
            <>
            <h1 className="text-center mb-4">Categories</h1>
            <Link to="add">
                <button className="btn btn-primary mb-4 px-5">Add Category</button>
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
            <h1 className="text-center mb-4">Categories</h1>
            <div className="px-5">
                <Link to="add">
                    <button className="btn btn-primary mb-4">Add Category</button>
                </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((el) => {
                        return <CategoryRow 
                        category={el}
                        key={el.id}
                        />
                    })}
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default CategoryPage
