import { FETCH_CATEGORIES, FETCH_SINGLE_CATEGORY } from "../actions/actionCreator";

const initialValue = {
    categories: [],
    categorySingle:{}
}

export default function categoriesReducer(state = initialValue, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload}
        case FETCH_SINGLE_CATEGORY:
            return {...state, categorySingle: action.payload}
        default:
            return state
    }
}