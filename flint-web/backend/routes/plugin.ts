import { Server } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

export function setupPluginServer(server: Server) {
  const pluginPort = parseInt(process.env.PLUGIN_PORT || '7700', 10)
  
  const wss = new WebSocketServer({ port: pluginPort })
  const clients = new Set<WebSocket>()

  wss.on('connection', (ws) => {
    clients.add(ws)
    console.log('[Plugin] Client connected')

    ws.on('message', (message) => {
      try {
        const event = JSON.parse(message.toString())
        console.log(`[Plugin] Received event:`, event)
        
        // Broadcast to all other connected frontend clients
        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event))
          }
        })
      } catch (e) {
        console.error('[Plugin] Invalid message format')
      }
    })

    ws.on('close', () => {
      clients.delete(ws)
      console.log('[Plugin] Client disconnected')
    })
  })

  console.log(`Flint Plugin Bridge running on ws://localhost:${pluginPort}`)
}
