import { FETCH_CATEGORIES } from "../actions/actionCreator";


const initialValue = {
    categories: []
}

export default function categoriesReducer(state = initialValue, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload}
        default:
            return state
    }
}