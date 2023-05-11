import { Probot } from 'probot'
import pullRequestHandler from './handler/pullRequestHandler'
import issueHandler from './handler/issueHandler'
import discordWebhookHandler from './handler/discordWebhookHandler'
import { logger } from './logger'

export = (app: Probot): void => {
  app.on('pull_request.opened', async context => {
    try {
      await pullRequestHandler(context)
    } catch (err) {
      logger.error('Error processing pull request:', err)
      await discordWebhookHandler('Error processing pull request', err)
    }
  })

  app.on('issues.opened', async context => {
    try {
      await issueHandler(context)
    } catch (err) {
      logger.error('Error processing issue:', err)
      await discordWebhookHandler('Error processing issue', err)
    }
  })
}
