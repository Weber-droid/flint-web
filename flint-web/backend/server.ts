import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { proxyRouter } from './routes/proxy'
import { aiRouter } from './routes/ai'
import { setupPluginServer } from './routes/plugin'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

const server = createServer(app)

app.use('/api/proxy', proxyRouter)
app.use('/api/ai', aiRouter)

setupPluginServer(server)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Flint Backend running on port ${PORT}`)
})
