import axios from 'axios'

export default async function discordWebhookHandler(
  title: string,
  err: unknown
): Promise<void> {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    return
  }

  let errorMessage = 'An error occurred'
  if (err instanceof Error) {
    errorMessage = err.message
  }

  await axios.post(process.env.DISCORD_WEBHOOK_URL, {
    embeds: [
      {
        title: title,
        fields: [
          { name: 'Error message', value: errorMessage },
          { name: 'Error', value: JSON.stringify(err) }
        ],
        color: 0xff0000 // red color
      }
    ]
  })
}
