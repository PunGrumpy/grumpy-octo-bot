import { Context } from 'probot'

export async function issueOpenedHandler(
  context: Context<'issues.opened'>
): Promise<void> {
  const issue = context.payload.issue
  const repo = context.repo()

  const table = `| 🧾 Property | 📌 Value |
  | --- | --- |
  | 📝 Title | ${issue.title} |
  | 🆔 Number | ${issue.number} |
  | 👤 Created by | ${issue.user.login} |
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
