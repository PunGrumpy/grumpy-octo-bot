import { Context } from 'probot'
import { ChatGPTAPI } from '@oceanlvr/chatgpt'

export async function issueOpenedHandler(
  context: Context<'issues.opened'>
): Promise<void> {
  const issue = context.payload.issue
  const repo = context.repo()

  const gptClient = new ChatGPTAPI({
    sessionToken: process.env.SESSION_GPT_TOKEN || ''
  })

  gptClient.ensureAuth()

  const table = `| 🧾 Property | 📌 Value |
  | --- | --- |
  | 📝 Title | ${issue.title} |
  | 🆔 Number | ${issue.number} |
  | 👤 Created by | ${issue.user.login} |
  `

  const prompt = `Please provide insights on the following issue titled "${issue.title}" with details:\n\n${issue.body}\n\n`
  const response = await gptClient.sendMessage(prompt)

  const message = `👋 Hi @${issue.user.login}, 

Thank you for creating this issue! 🎉 Our team will review it and respond accordingly. 

In the meantime, we encourage you to explore our other open-source projects. Any contribution is greatly appreciated. 👍

Here are some details about the issue:

### 📊 Issue Statistics

${table}

### 🤖 AI Insights

${response}

We appreciate your input and patience. Happy coding! 💻`

  await context.octokit.issues.createComment({
    ...repo,
    issue_number: issue.number,
    body: message
  })
}
