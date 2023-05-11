import { createNodeMiddleware, createProbot } from 'probot'
import app from '../../../index'

const probot = createProbot({
  id: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY || process.env.PRIVATE_KEY_PATH,
  secret: process.env.WEBHOOK_SECRET
})

export default createNodeMiddleware(app, {
  probot,
  webhooksPath: '/api/github/webhooks'
})
