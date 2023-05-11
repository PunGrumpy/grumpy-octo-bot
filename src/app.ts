import { Probot } from 'probot'
import pullRequestHandler from './handler/pullRequestHandler'
import issueHandler from './handler/issueHandler'

export = (app: Probot) => {
  app.on('pull_request.opened', pullRequestHandler)
  app.on('issues.opened', issueHandler)
}