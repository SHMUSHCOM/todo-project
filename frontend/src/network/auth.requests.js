const { VITE_SERVER_URL } = import.meta.env

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
