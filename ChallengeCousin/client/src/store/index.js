import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { FETCH_CATEGORIES, FETCH_PRODUCTS, FETCH_PRODUCT_DETAIL } from "./actions/actionCreator";

import reducer from "./reducers";

// const initialValue = {
//     products: [],
//     categories: [],
//     productDetail: {}
// }

// function mainReducer(state = initialValue, action) {
//     switch (action.type) {
//         case FETCH_PRODUCTS:
//             return {...state, products: action.payload}
//         case FETCH_CATEGORIES:
//             return {...state, categories: action.payload}
//         case FETCH_PRODUCT_DETAIL:
//             return {...state, productDetail: action.payload}
//         default:
//             return state
//     }
// }

// const store = createStore(mainReducer, applyMiddleware(thunk))

const store = createStore(reducer, applyMiddleware(thunk))

export default store