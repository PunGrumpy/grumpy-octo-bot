import { createNodeMiddleware, createProbot } from 'probot'
import app from '../../../app'

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: '/api/github/webhooks'
})
