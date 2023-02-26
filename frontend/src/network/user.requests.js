import { useSelector, useDispatch } from "react-redux"
import { userUpdated } from "../state/slices/app.slice"
import { usersFetched } from "../state/slices/user.slice"
import { useState } from "react"
const {VITE_SERVER_URL} = import.meta.env

// GET LOGGED IN USER
const loggedUserEndpoint = `${VITE_SERVER_URL}/users/self`
export const useGetLoggedUser = () => {
  const accessToken = useSelector(state => state.app.accessToken)
  const dispatch = useDispatch()
  
  return async () => {
    const method = "GET"
    const headers = [
      ["content-type", "application/json"],
      ["access-token", accessToken],
    ]

    const response = await fetch(loggedUserEndpoint, { method, headers })
    const user = await response.json()
    dispatch(userUpdated(user))
    return {user}
  }
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