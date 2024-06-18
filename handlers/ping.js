module.exports = async ctx => {
  const webhookInfo = await ctx.telegram.getWebhookInfo()

  const message = `pong!
📥 *Queue Status:*
- 🔄 *Pending Updates:* \`${webhookInfo.pending_update_count}\`
`

  const response = await ctx.replyWithMarkdown(message, {
    reply_to_message_id: ctx.message.message_id
  })

  // delete the message after 10 seconds
  await new Promise(resolve => setTimeout(resolve, 10000))
  await ctx.telegram.deleteMessage(ctx.chat.id, response.message_id)
  await ctx.deleteMessage()
}
