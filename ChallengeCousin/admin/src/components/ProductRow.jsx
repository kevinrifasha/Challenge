import { useNavigate } from "react-router-dom";
import "./ProductRow.css"
import { useDispatch } from "react-redux";
import { FETCH_PRODUCTS, deleteData, fetchProduct } from "../store/actions/actionCreator";
import { toast } from 'react-toastify';

export default function ProductRow(props) {
    const {product} = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleDelete() {
        try {
            // await fetch(`http://localhost:3000/products/${product.id}`, {
            //     method: "delete",
            //     headers: {
            //         access_token: localStorage.access_token
            //     }
            // })
            await dispatch(deleteData(`/products/${product.id}`))
            await dispatch(fetchProduct("/products", FETCH_PRODUCTS))
            toast.success("Product has been deleted")
        } catch (error) {
            console.log(error);
        }
    }
    return (<tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>
            <ul>
                {product.Ingredients.map((el, index) => {
                    return <li key={index}>{el.name}</li>
                })}
            

            </ul>
        </td>
        <td>{Number(product.price).toLocaleString("id-ID", {style: "currency", currency: "IDR"})}</td>
        <td className="text-center">
            <img 
            src={product.imgUrl}/>
        </td>
        <td>{product.User.email}</td>
        <td>{product.Category.name}</td>
        <td className="text-center">
            <button 
            onClick={() => navigate(`/edit/${product.id}`)}
            className="btn btn-warning m-1">Edit</button>
            <button 
            onClick={handleDelete}
            className="btn btn-danger m-1">Delete</button>
        </td>
    </tr>)
}