import { useState } from "react";
import { useDispatch } from "react-redux";
import { todosFetched } from "../state/slices/todo.slice";

const { VITE_SERVER_URL } = import.meta.env
const todoEndpoint = `${VITE_SERVER_URL}/todos`
const syncEndpoint = `${VITE_SERVER_URL}/todos/sync`

// CUSTOM HOOK | INVALIDATE TODOS
export const useInvalidateTodos = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const invalidateTodos = async ()=>{
        setIsLoading(true)
        const response = await fetch(todoEndpoint);
        const data = await response.json();
        dispatch(todosFetched(data));
        setIsLoading(false)
    }
    return {invalidateTodos, isLoading}
}

// SYNC TODOS FROM CLIENT TO SERVER
export const syncTodos = async (todos) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body = todos

    const response = await fetch(syncEndpoint, {method, headers, body})
    const data = await response.json()

    return data
}

// CREATE NEW TODO ON SERVER
export const createTodo = async (todo) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body =JSON.stringify([todo])

    const response = await fetch(todoEndpoint, {method, headers, body})
    const data = await response.json()

    return data
}

// AUTH | REGISTER USER
const registerEndpoint = `${VITE_SERVER_URL}/auth/register`
export const registerUser = async ({email, password}) => {
    const method = 'POST'
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({email, password})

    const response = await fetch(registerEndpoint, {method, headers, body})
    const data = await response.json()

    console.log(data)
    return ({data, success: response.ok})
}

// AUTH | LOGIN
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
