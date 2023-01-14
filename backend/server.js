import express, { json } from 'express'
import connect from './database/config.js'
 
import morgan from 'morgan'
import cors from 'cors'

import artistRouter from './modules/artists/artist.routes.js'
import songRouter from './modules/songs/song.routes.js'
import playlistRouter from './modules/playlists/playlist.routes.js'

const {PORT, HOST, DB_URI} = process.env
const server = express()

// Middleware
server.use(morgan('dev'))
server.use(cors())
server.use(json())

// Routes
server.use('/artists', artistRouter )
server.use('/songs', songRouter )
server.use('/playlists', playlistRouter )

// 500 Error
server.use((error, request, response, next)=>{
    response.status(500).json(error)
})

// 400 Error
server.use((request, response)=> {
    response.status(404).send('404 Not Found')
})

// Connections
await connect(DB_URI)
console.log(`📀 Connected on ${DB_URI}`)
await server.listen(PORT, HOST) 
console.log(`🌍 Listening on http://${HOST}:${PORT}`)
