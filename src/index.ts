import { Probot } from 'probot'
import { Context } from 'probot'
import pullRequestHandler from './handler/pullRequestHandler'
import { logger } from './logger'
import discordWebhookHandler from './handler/discordWebhookHandler'
import issueHandler from './handler/issueHandler'

const pullRequestHandle = async (
  context: Context<'pull_request.opened'>
): Promise<void> => {
  try {
    await pullRequestHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in pullRequestHandler', err)
  }
}

const issueHandle = async (
  context: Context<'issues.opened'>
): Promise<void> => {
  try {
    await issueHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in issueHandler', err)
  }
}

export = (app: Probot): void => {
  app.on('pull_request.opened', pullRequestHandle)
  app.on('issues.opened', issueHandle)
}
