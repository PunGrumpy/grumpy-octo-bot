import { Probot } from 'probot'
import app from './app'

const probot = new Probot({
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  cert: process.env.PRIVATE_KEY,
  port: 3000,
  webhookPath: '/webhooks/github',
  webhookProxy: process.env.WEBHOOK_PROXY_URL
})
probot.load(app)
probot.start()
