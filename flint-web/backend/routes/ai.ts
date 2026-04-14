import { Router } from 'express'
import axios from 'axios'

export const aiRouter = Router()

aiRouter.post('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const { prompt, context } = req.body
  const aiUrl = process.env.FLINT_AI_URL || 'http://localhost:8000'

  try {
    const response = await axios.post(`${aiUrl}/generate`, {
      prompt,
      context
    }, {
      responseType: 'stream'
    })

    response.data.on('data', (chunk: Buffer) => {
      res.write(`data: ${chunk.toString()}\n\n`)
    })

    response.data.on('end', () => {
      res.write('data: [DONE]\n\n')
      res.end()
    })
  } catch (error) {
    res.write(`data: {"error": "AI service unavailable"}\n\n`)
    res.end()
  }
})
