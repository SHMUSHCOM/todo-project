import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { todosFetched } from "../state/slices/todo.slice";


const { VITE_SERVER_URL } = import.meta.env
const todoEndpoint = `${VITE_SERVER_URL}/todos`
const syncEndpoint = `${VITE_SERVER_URL}/todos/sync`

// Custom Hook to fetch todos from server and refresh redux state
export const useInvalidateTodos =  () => {
        const [stale, setStale] = useState(false)

        const dispatch = useDispatch();
        useEffect( () => {

            const refresh = async () => {
                const response = await fetch(todoEndpoint);
                const data = await response.json();
                dispatch(todosFetched(data));
            }

            refresh().catch(console.error)

        } ,[stale])

        function toggleStale()  {
            setStale(!stale)
        }

        return toggleStale

}

export const syncTodos = async (todos) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body = todos

    const response = await fetch(syncEndpoint, {method, headers, body})
    const data = await response.json()

    return data
}

export const createTodo = async (todo) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body =JSON.stringify([todo])

    const response = await fetch(todoEndpoint, {method, headers, body})
    const data = await response.json()

    return data
}

