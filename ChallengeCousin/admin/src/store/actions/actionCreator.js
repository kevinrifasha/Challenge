import fetchData from "../../helpers/fetch"

export const FETCH_PRODUCTS = "products/fetch"
export const FETCH_CATEGORIES = "categories/fetch"
export const FETCH_PRODUCT_DETAIL = "detail/fetch"
export const CLEAR_PRODUCT_DETAIL = "detail/clear"
export const FETCH_SINGLE_CATEGORY = "category/single"

const BASE_URL = "https://server.andikaraditya.cloud"

export const fetchProduct = (url, type) => {
    return async (dispatch) => {
        try {
            const data = await fetchData(url)

            // console.log(data, "<<<<< from thunk")
            dispatch({
                type: type,
                payload: data
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const deleteData = (url, type) => {
    return async (dispatch) => {
        try {
            const response = await fetch( BASE_URL + url, {
                method: "delete",
                headers: {
                    access_token: localStorage.access_token
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data)
            }
            // console.log(data, "<<<<< from thunk")
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const sendData = (url, method, payload) => {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + url, {
                method: method,
                body: JSON.stringify(payload),
                headers: {
                    access_token: localStorage.access_token,
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}