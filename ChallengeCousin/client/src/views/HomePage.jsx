import { useEffect } from "react";
import "./HomePage.css"
import { useDispatch, useSelector} from "react-redux";
import { FETCH_CATEGORIES, FETCH_PRODUCTS, fetchServer } from "../store/actions/actionCreator";
import ProductCard from "../components/ProductCard";
import CategoriesCard from "../components/CategoriesCard";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HomePage() {

    const products = useSelector((state) => state.products.products)
    const categories = useSelector((state) => state.categories.categories)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchServer("/pub/products", FETCH_PRODUCTS))
        dispatch(fetchServer("/pub/categories", FETCH_CATEGORIES))
    }, [])

    function handleCategory() {
        dispatch(fetchServer(`/pub/products`, FETCH_PRODUCTS))
    }

    return (
        <>
        <Navbar />
            <header>
                <div id="header">
                    <h1>Home Page</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur mollitia
                        velit rem possimus nihil recusandae ut fugiat quaerat maiores corporis? Eius
                        mollitia aliquam amet facilis, deleniti non quia ipsum autem?
                    </p>
                </div>
            </header>
            <div id="categories">
                <h2>Choose Our Selections</h2>
                <div id="container-category">
                    <div
                        onClick={handleCategory}
                        className="item-categories pointer-hover">
                        All Category
                    </div>
                    {categories.map((el) => {
                        return <CategoriesCard category={el} key={el.id}/>
                    })}
                    
                </div>
            </div>
            <div id="product">
                <h2>Our Products</h2>
                {products.length === 0 ? 
                <>
                    <p
                    style={{textAlign: "center", fontSize: "2rem"}} 
                    >looks like theres nothing to show or it still loading</p> 
                    <img
                    style={{margin: "auto", display: "flex"}} 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWV2c2ZkemF5YzRpdHpkazBnNTVhNTkxY2p3a2wydzNwOXFvOTRtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/uOuSIvIVRQoemjmPTz/giphy.gif" alt="" />
                </>
                : <div className="container">
                    {products.map((el) => {
                        return <ProductCard product={el} key={el.id} />
                    })}
                </div>}
                
            </div>
            <Outlet />
            <Footer />
        </>
    )
}

export default HomePage