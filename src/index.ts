import { Probot, Context } from 'probot'
import { issueOpenedHandler } from './handler/issueHandler'
import {
  pullRequestOpenedHandler,
  pullRequestSynchronizeHandler
} from './handler/pullRequestHandler'
import discordWebhookHandler from './handler/discordWebhookHandler'
import { logger } from './logger'

const pullRequestOpenedHandle = async (
  context: Context<'pull_request.opened'>
): Promise<void> => {
  try {
    await pullRequestOpenedHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in pullRequestHandler', err)
  }
}

const pullRequestSynchronizeHandle = async (
  context: Context<'pull_request.synchronize'>
): Promise<void> => {
  try {
    await pullRequestSynchronizeHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in pullRequestHandler', err)
  }
}

const issueOpenedHandle = async (
  context: Context<'issues.opened'>
): Promise<void> => {
  try {
    await issueOpenedHandler(context)
  } catch (err) {
    logger.error(err)
    discordWebhookHandler('An error occurred in issueHandler', err)
  }
}

export default (app: Probot): void => {
  app.on('pull_request.opened', pullRequestOpenedHandle)
  app.on('pull_request.synchronize', pullRequestSynchronizeHandle)
  app.on('issues.opened', issueOpenedHandle)
}
