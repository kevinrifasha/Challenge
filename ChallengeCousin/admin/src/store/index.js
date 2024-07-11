import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { CLEAR_PRODUCT_DETAIL, FETCH_CATEGORIES, FETCH_PRODUCTS, FETCH_PRODUCT_DETAIL, FETCH_SINGLE_CATEGORY } from "./actions/actionCreator";

import reducer from "./reducers";

const initialValue = {
    products: [],
    categories: [],
    productDetail: {},
    categorySingle:{}
}

// function mainReducer(state = initialValue, action) {
//     switch (action.type) {
//         case FETCH_PRODUCTS:
//             return {...state, products: action.payload}
//         case FETCH_CATEGORIES:
//             return {...state, categories: action.payload}
//         case FETCH_PRODUCT_DETAIL:
//             return {...state, productDetail: action.payload}
//         case FETCH_SINGLE_CATEGORY:
//             return {...state, categorySingle: action.payload}
//         case CLEAR_PRODUCT_DETAIL:
//             return {...state, productDetail: {}}
//         default:
//             return state
//     }
// }

// const store = createStore(mainReducer, applyMiddleware(thunk))

const store = createStore(reducer, applyMiddleware(thunk))

export default store