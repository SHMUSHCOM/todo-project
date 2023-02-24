import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { todosFetched } from "../state/slices/todo.slice"
import { usersFetched } from "../state/slices/user.slice"
import { userUpdated } from "../state/slices/app.slice"
import { useNavigate } from "react-router-dom"

const { VITE_SERVER_URL } = import.meta.env
const todoEndpoint = `${VITE_SERVER_URL}/todos`
const syncEndpoint = `${VITE_SERVER_URL}/todos/sync`

// FETCH TODOS
const fetchTodos = async accessToken => {
  const method = "GET"
  const headers = [
    ["content-type", "application/json"],
    ["access-token", accessToken],
  ]
  const response = await fetch(todoEndpoint, { method, headers })
  const data = await response.json()
  return {data, success: response.ok}
}

// CUSTOM HOOK | INVALIDATE TODOS
export const useInvalidateTodos = () => {
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const invalidateTodos = async () => {
    setIsLoading(true)
    const {data, success} = await fetchTodos(accessToken)
    if (success) dispatch(todosFetched(data))
    setIsLoading(false)
    if (!success) navigate('/auth/login')
  }

  return { invalidateTodos, isLoading }
}

// SYNC TODOS FROM CLIENT TO SERVER
export const useSyncTodos = (todos, accessToken)=>{
  return async () => {

    const method = "POST"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    const body = todos
    const response = await fetch(syncEndpoint, { method, headers, body })
    const data = await response.json()
  
    return {data}
  }
}

// CREATE NEW TODO ON SERVER
export const useCreateTodo = ()=>{
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  return async todo => {
    const method = "POST"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]
    const body = JSON.stringify([todo])
    
    setIsLoading(true)
    const response = await fetch(todoEndpoint, { method, headers, body })
    const data = await response.json()
    setIsLoading(false)
    setIsError(!response.ok) 

    return {data, isError, isLoading}
  }
}

// AUTH | REGISTER USER
const registerEndpoint = `${VITE_SERVER_URL}/auth/register`
export const registerUser = async ({ email, password }) => {
  const method = "POST"
  const headers = { "content-type": "application/json" }
  const body = JSON.stringify({ email, password })

  const response = await fetch(registerEndpoint, { method, headers, body })
  const data = await response.json()

  console.log(data)
  return { data, success: response.ok }
}

// AUTH | LOGIN
const loginEndpoint = `${VITE_SERVER_URL}/auth/email/login`
export const loginUser = async ({ email, password }) => {
  const method = "POST"
  const headers = { "content-type": "application/json" }
  const body = JSON.stringify({ email, password })

  const response = await fetch(loginEndpoint, { method, headers, body })
  const data = await response.json()

  return {data, success: response.ok}
}

// GET LOGGED IN USER
const loggedUserEndpoint = `${VITE_SERVER_URL}/users/self`
export const useGetLoggedUser = async () => {
  const accessToken = useSelector(state => state.app.accessToken)
  const dispatch = useDispatch()
  const method = "GET"
  const headers = [
    ["content-type", "application/json"],
    ["access-token", accessToken],
  ]
  const response = await fetch(loggedUserEndpoint, { method, headers })
  const user = await response.json()
  dispatch(userUpdated(user))
  return user
}

const userEndpoint = `${VITE_SERVER_URL}/users/`
// GET USERS FOR ORGANIZATION
export const useGetUsers = ()=>{
  const accessToken = useSelector(state => state.app.accessToken)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const dispatch = useDispatch()

  return async () => {
    const method = "GET"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]

    setIsLoading(true)
    const response = await fetch(userEndpoint, { method, headers })
    const users = await response.json()
    dispatch(usersFetched(users))
    setIsLoading(false)
    setIsError(!response.ok) 

    return {users, isError, isLoading}
  }
}
