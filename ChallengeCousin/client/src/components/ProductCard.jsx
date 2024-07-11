import { useNavigate } from "react-router-dom";
import "./ProductCard.css"

export default function ProductCard(props) {
    const {product} = props
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/products/${product.id}`)
    }

    return (
        <>
        <div 
        onClick={handleClick}
        className="item-product pointer-hover grow">
            <img src={product.imgUrl} alt="" />
            <p>{product.name}</p>
            <p>{Number(product.price).toLocaleString("id-ID", {style: "currency", currency: "IDR"})}</p>
        </div>
        </>
    )
}