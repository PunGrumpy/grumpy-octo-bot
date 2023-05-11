import { createNodeMiddleware, createProbot } from 'probot'
import app from '../../../index'

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: '/api/github/webhooks'
})
