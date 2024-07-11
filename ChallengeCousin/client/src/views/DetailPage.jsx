import { useEffect, useState } from "react";
import "./DetailPage.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FETCH_PRODUCT_DETAIL, fetchServer } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";
import store from "../store";

export default function DetailPage() {
    const {id} = useParams()

    // const product = useSelector((state) => state.products.productDetail)
    const [loading, setLoading] = useState(true)

    const [product, setProduct] = useState({
        name: "",
        imgUrl: "",
        price: 0,
        description: "",
        Ingredients: [],
        Category: {}
    })
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        dispatch(fetchServer(`/pub/products/${id}`, FETCH_PRODUCT_DETAIL))
            .then(() => {
                setProduct(store.getState().products.productDetail)
                setLoading(false)
            })
    }, [])


    if (loading) {
        return (
            <div className="overlay">
                <div className="detail-card">
                    <p>Loading Data</p>
                    <img
                        style={{margin: "auto", display: "flex"}} 
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWV2c2ZkemF5YzRpdHpkazBnNTVhNTkxY2p3a2wydzNwOXFvOTRtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/uOuSIvIVRQoemjmPTz/giphy.gif" alt="" />
                </div>
            </div>
        )
    }

    return (
        <div 
        onClick={() => {
            // console.log("overlay")
            navigate("/")
        }}
        className="overlay">
            <div 
            onClick={(e) => {
                e.stopPropagation()
            }}
            className="detail-card">
                <img src={product.imgUrl} alt="" />
                <div className="detail-text">
                    <h1>{product.name}</h1>
                    <div className="flex">
                        <p>{Number(product.price).toLocaleString("id-ID", {style: "currency", currency: "IDR"})}</p>
                        <p className="category-pill">{product.Category.name}</p>
                    </div>
                    <p className="description">{product.description}</p>
                    <div className="ingredients">
                    {product.Ingredients.length >0 ? (<p>Ingredients</p>) : ""}
                    
                    <ul>
                        {product.Ingredients.map((el, index) => {
                            return (
                                <li key={index}>{el.name}</li>
                            )
                        })}
                    </ul>
                    </div>
                <button className="pointer-hover grow">Order Now</button>
                </div>
            </div>

        </div>
    )
}