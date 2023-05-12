import { Probot } from 'probot'
import { Context } from 'probot'
import { issueOpenedHandler } from './handler/issueHandler'
import { pullRequestOpenedHandler } from './handler/pullRequestHandler'
import discordWebhookHandler from './handler/discordWebhookHandler'
import { logger } from './logger'

const pullRequestHandle = async (
  context: Context<'pull_request.opened'>
): Promise<void> => {
  try {
    await pullRequestOpenedHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in pullRequestHandler', err)
  }
}

const issueHandle = async (
  context: Context<'issues.opened'>
): Promise<void> => {
  try {
    await issueOpenedHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in issueHandler', err)
  }
}

export = (app: Probot): void => {
  app.on('pull_request.opened', pullRequestHandle)
  app.on('issues.opened', issueHandle)
}
