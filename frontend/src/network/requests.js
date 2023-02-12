import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosFetched } from "../state/slices/todo.slice";
import { todoSelected, newTodoAdded } from "../state/slices/app.slice";



const { VITE_SERVER_URL } = import.meta.env
const todoEndpoint = `${VITE_SERVER_URL}/todos`
const syncEndpoint = `${VITE_SERVER_URL}/todos/sync`


// Custom Hook to fetch todos from server and refresh redux state
export const useInvalidateTodos = () => {
        const [stale, setStale] = useState(false)
        const newTodo = useSelector( state => state.app.newTodo)
        const dispatch = useDispatch();

        useEffect( () => {

            const refresh = async () => {
                const response = await fetch(todoEndpoint);
                const data = await response.json();
                dispatch(todosFetched(data));
                dispatch(todoSelected(newTodo))
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

const registerEndpoint = `${VITE_SERVER_URL}/auth/register`
export const registerUser = async ({email, password}) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({email, password})

    const response = await fetch(registerEndpoint, {method, headers, body})
    const {accessToken} = await response.json()

    if (!response.ok) throw new Error(accessToken)
    return accessToken
}

const loginEndpoint = `${VITE_SERVER_URL}/auth/login`
export const loginUser = async ({email, password}) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({email, password})

    const response = await fetch(loginEndpoint, {method, headers, body})
    const {accessToken} = await response.json()

    return accessToken
}


const userEndpoint = `${VITE_SERVER_URL}/users/1234`
export const getProtectedUserData = async (accessToken) => {
    
    const method = 'GET'
    const headers = [
        ['content-type','application/json'],
        ['access-token', accessToken],
    ]

    const response = await fetch(userEndpoint, {method, headers})
    const {user} = await response.json()

    return user
}
