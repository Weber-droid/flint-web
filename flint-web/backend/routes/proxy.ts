import { Router } from 'express'
import axios from 'axios'

export const proxyRouter = Router()

proxyRouter.post('/', async (req, res) => {
  const { method, url, headers, body, params } = req.body
  
  const startTime = Date.now()
  let durationMs = 0
  let sizeBytes = 0

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      params,
      validateStatus: () => true, // Don't throw on non-200
      responseType: 'text',
      transformResponse: [(data) => data] // Keep raw string
    })

    durationMs = Date.now() - startTime
    const bodyStr = response.data || ''
    sizeBytes = Buffer.byteLength(bodyStr, 'utf8')

    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: bodyStr,
      durationMs,
      sizeBytes
    })
  } catch (error: any) {
    durationMs = Date.now() - startTime
    res.status(500).json({
      error: error.message,
      durationMs,
      sizeBytes: 0
    })
  }
})
