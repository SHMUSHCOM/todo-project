import express, { json } from "express"
import connect from "./database/config.js"

import morgan from "morgan"
import cors from "cors"

import todoRouter from "./modules/todos/todo.router.js"
import userRouter from "./modules/users/user.router.js"
import organizationRouter from "./modules/organizations/organization.router.js"
import authRouter, { authenticate } from "./modules/auth/auth.router.js"

const { HOST, PORT, DB_URI } = process.env
const server = express()

// Middleware
server.use(morgan("dev"))
server.use(cors())
server.use(json())

// Routes
server.use("/auth", authRouter)
server.use("/todos", authenticate, todoRouter)
server.use("/users", authenticate, userRouter)
server.use("/organizations", authenticate, organizationRouter)

// 500 Error
server.use((error, request, response, next) => {
  response.status(500).json(error)
})

// 400 Error
server.use((request, response) => {
  response.status(404).send("404 Not Found")
})

// Connections
await connect(DB_URI)
console.log(`📀 Connected on ${DB_URI}`)
await server.listen(PORT)
console.log(`🌍 Listening on http://${HOST}:${PORT}`)
 