const Markup = require('telegraf/markup')
const { randomInt } = require('crypto')

module.exports = async ctx => {
  const groupQuotes = await ctx.db.Quote.aggregate(
    [
      {
        $match: {
          $and: [
            { group: ctx.group.info._id },
            { 'rate.score': { $gt: 0 } }
          ]
        }
      },
      { $sample: { size: 100 } }
    ]
  )

  if (groupQuotes.length > 0) {
    const quote = groupQuotes[randomInt(0, groupQuotes.length)]
    await ctx.replyWithDocument(quote.file_id, {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton(`👍 ${quote.rate.votes[0].vote.length || ''}`, 'rate:👍'),
          Markup.callbackButton(`👎 ${quote.rate.votes[1].vote.length || ''}`, 'rate:👎')
        ],
      ]),
      reply_to_message_id: ctx.message.message_id,
      allow_sending_without_reply: true
    })
  } else {
    if (!ctx.state.randomQuote) {
      await ctx.replyWithHTML(ctx.i18n.t('random.empty'), {
        reply_to_message_id: ctx.message.message_id,
        allow_sending_without_reply: true
      })
    }
  }
}
