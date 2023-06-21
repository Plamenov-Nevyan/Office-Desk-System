
const baseUrl = 'http://localhost:8000'


export const submitUserData = async (data) => {
    await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    })
}