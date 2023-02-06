const { VITE_SERVER_URL } = import.meta.env
const fetchEndpoint = `${VITE_SERVER_URL}/todos`
const upsertEndpoint = `${VITE_SERVER_URL}/todos/upsert`

export const fetchTodos = async () => {
    const response = await fetch(fetchEndpoint);
    const data = await response.json();
    return data
}

export const updateTodos = async (todos) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body = todos

    const response = await fetch(upsertEndpoint, {method, headers, body})
    const data = await response.json()

    return data
}

