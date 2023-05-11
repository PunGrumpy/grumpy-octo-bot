import { Context } from 'probot'

export default async function pullRequestHandler(
  context: Context<'pull_request.opened'>
): Promise<void> {
  const pullRequest = context.payload.pull_request
  const repo = context.repo()

  // Construct table with pull request details
  const table = `| Property | Value |
  | --- | --- |
  | Title | ${pullRequest.title} |
  | URL | ${pullRequest.html_url} |
  | Created by | ${pullRequest.user.login} |
  | Created at | ${pullRequest.created_at} |
  | Updated at | ${pullRequest.updated_at} |
  `

  const message = `👋 Hi @${pullRequest.user.login}, 

Thank you for your contribution! 🎉 Your pull request has been received and our team will review it shortly. 

In the meantime, we encourage you to explore our other open-source projects. Your contributions to these projects are highly valued. 👍

Here are some details about your pull request:

### 📊 Pull Request Statistics
${table}

We appreciate your patience and contribution. Happy coding! 💻`

  await context.octokit.issues.createComment({
    ...repo,
    issue_number: pullRequest.number,
    body: message
  })
}
