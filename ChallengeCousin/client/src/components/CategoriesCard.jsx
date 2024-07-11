import { FETCH_PRODUCTS, fetchServer } from "../store/actions/actionCreator";
import "./CategoriesCard.css"

import { useDispatch } from "react-redux";

export default function CategoriesCard(props) {
    const {category} = props
    const dispatch = useDispatch()
    function handleCategory() {
        dispatch(fetchServer(`/pub/products?categoryId=${category.id}`, FETCH_PRODUCTS))
    }
    return (
        <>
        <div
        onClick={handleCategory}
        className="item-categories pointer-hover">
            {category.name}
        </div>
        </>
    )
}