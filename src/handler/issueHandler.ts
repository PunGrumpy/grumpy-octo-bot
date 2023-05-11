import { Context } from 'probot'

export default async function issueHandler(
  context: Context<'issues.opened'>
): Promise<void> {
  const issue = context.payload.issue
  const repo = context.repo()

  // Construct table with issue details
  const table = `| Property | Value |
  | --- | --- |
  | Title | ${issue.title} |
  | URL | ${issue.html_url} |
  | Created by | ${issue.user.login} |
  | Created at | ${issue.created_at} |
  | Updated at | ${issue.updated_at} |
  `

  const message = `👋 Hi @${issue.user.login}, 

Thank you for creating this issue! 🎉 Our team will review it and respond accordingly. 

In the meantime, we encourage you to explore our other open-source projects. Any contribution is greatly appreciated. 👍

Here are some details about the issue:

### 📊 Issue Statistics
${table}

We appreciate your input and patience. Happy coding! 💻`

  await context.octokit.issues.createComment({
    ...repo,
    issue_number: issue.number,
    body: message
  })
}
