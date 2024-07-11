import { useState,useEffect } from 'react'
import fetchData from '../helpers/fetch'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function getData(url) {
        try {
            setLoading(true)
            const items = await fetchData(url)
            setData(items)
        } catch (error) {
            setError(error)
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData(url)
    }, [])

    return {
        data,
        isLoading,
        error
    }
}

export default useFetch
