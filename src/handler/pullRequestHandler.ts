import { Context } from 'probot'

export async function pullRequestOpenedHandler(
  context: Context<'pull_request.opened'>
): Promise<void> {
  const pullRequest = context.payload.pull_request
  const repo = context.repo()

  // Construct table with pull request details
  const table = `| 🧾 Property | 📌 Value |
  | --- | --- |
  | 📝 Title | ${pullRequest.title} |
  | 🆔 Number | ${pullRequest.number} |
  | ➕➖ Line Changes | ${pullRequest.additions + pullRequest.deletions} |
  | 🔄 Commits | ${pullRequest.commits} |
  | 📂 Files Changed | ${pullRequest.changed_files} |
  | 👤 Created by | ${pullRequest.user.login} |
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

export async function pullRequestSynchronizeHandler(
  context: Context<'pull_request.synchronize'>
) {
  const { ChatGPTAPI } = await import('@oceanlvr/chatgpt')

  const pullRequest = context.payload.pull_request
  const compare = await context.octokit.repos.compareCommits({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    base: pullRequest.base.sha,
    head: pullRequest.head.sha
  })

  const diffHunks = compare.data.files?.[0]?.patch

  if (!diffHunks) return

  const gptClient = new ChatGPTAPI({
    sessionToken: process.env.SESSION_GPT_TOKEN || ''
  })

  gptClient.ensureAuth()

  const repo = await context.octokit.repos.get(context.repo())
  const lang = repo.data.language?.toLowerCase() || 'javascript'
  const prompt = `Please review the following ${lang} code changes:\n\n${diffHunks}\n\n}`

  const response = await gptClient.sendMessage(prompt)

  // Construct table with pull request details
  const table = `| 🧾 Property | 📌 Value |
  | --- | --- |
  | 📝 Title | ${pullRequest.title} |
  | 🆔 Number | ${pullRequest.number} |
  | ➕➖ Line Changes | ${pullRequest.additions + pullRequest.deletions} |
  | 🔄 Commits | ${pullRequest.commits} |
  | 📂 Files Changed | ${pullRequest.changed_files} |
  | 👤 Created by | ${pullRequest.user.login} |
  `

  const message = `👋 Hi @${pullRequest.user.login},

Thank you for your contribution! 🎉 Your pull request has been received and our team will review it shortly.

In the meantime, we encourage you to explore our other open-source projects. Your contributions to these projects are highly valued. 👍

Here are some details about your pull request:

### 📊 Pull Request Statistics

${table}

### 🤖 AI Review

${response}

We appreciate your patience and contribution. Happy coding! 💻`

  await context.octokit.issues.createComment({
    ...context.repo(),
    issue_number: pullRequest.number,
    body: message
  })
}
