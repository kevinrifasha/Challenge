import { useDispatch } from "react-redux";
import { FETCH_CATEGORIES, deleteData, fetchProduct } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function CategoryRow(props) {
    const {category} = props

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleDelete() {
        try {
            // await fetch(`http://localhost:3000/categories/${category.id}`, {
            //     method: "delete",
            //     headers: {
            //         access_token: localStorage.access_token
            //     }
            // })
            await dispatch(deleteData(`/categories/${category.id}`))
            await dispatch(fetchProduct("/categories", FETCH_CATEGORIES))
            toast.success("Category has been deleted")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <tr>
            <td>{category.id}</td>
            <td>{ category.name }</td>
            <td className="d-flex">
                <button 
                onClick={() => navigate(`/categories/${category.id}`)}
                className="btn btn-warning m-auto">Edit</button>
                <button 
                onClick={handleDelete}
                className="btn btn-danger m-auto">Delete</button>
            </td>
        </tr>
    )
}
