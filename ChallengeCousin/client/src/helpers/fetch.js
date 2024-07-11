const BASE_URL = "https://server.andikaraditya.cloud"

async function fetchData(url) {
    try {
        const response = await fetch( BASE_URL + url, {
        method: "get"
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data)
        }
        return data
    } catch (error) {
        throw error
    }
}

export default fetchData