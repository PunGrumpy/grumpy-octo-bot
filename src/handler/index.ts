import { Probot } from 'probot'
import pullRequestHandler from './pullRequestHandler'
import issueHandler from './issueHandler'

export default (app: Probot): void => {
  app.on('pull_request.opened', pullRequestHandler)
  app.on('issues.opened', issueHandler)
}
