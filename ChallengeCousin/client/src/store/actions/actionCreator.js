import fetchData from "../../helpers/fetch"

export const FETCH_PRODUCTS = "products/fetch"
export const FETCH_CATEGORIES = "categories/fetch"
export const FETCH_PRODUCT_DETAIL = "detail/fetch"

export const fetchServer = (url, type) => {
    return async (dispatch) => {
        try {
            const data = await fetchData(url)

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