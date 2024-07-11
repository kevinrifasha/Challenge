import { FETCH_PRODUCTS, FETCH_PRODUCT_DETAIL } from "../actions/actionCreator";

const initialValue = {
    products: [],
    productDetail: {}
}

export default function productsReducer(state = initialValue, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {...state, products: action.payload}
        case FETCH_PRODUCT_DETAIL:
            return {...state, productDetail: action.payload}
        default:
            return state
    }
}