const Redis = require('ioredis')

const redis = new Redis()

const PREFIX = 'quotly'

module.exports = async (ctx, next) => {
  if (!ctx.chat.username) {
    return next()
  }

  if (ctx.message.sticker) {
    const { set_name } = ctx.message.sticker

    const key = `${PREFIX}:sticker_set:${set_name}:${Date.now()}`
    redis.zincrby(`${PREFIX}:sticker_sets`, 1, set_name)
    redis.set(key, 1, 'EX', 60)
  } else if (ctx.message.entities || ctx.message.entities) {
    const entities = ctx.message.entities || ctx.message.caption_entities

    const customEmoji = entities.map((entity) => {
      if (entity.type === 'custom_emoji') {
        return entity.custom_emoji_id
      }
    }).filter((entity) => entity)

    if (customEmoji.length > 0) {
      const emojiStickers = await ctx.telegram.callApi('getCustomEmojiStickers', {
        custom_emoji_ids: customEmoji
      })

      const uniqueStickerSets = new Set(emojiStickers.map(sticker => sticker.set_name))

      uniqueStickerSets.forEach(setName => {
        const key = `${PREFIX}:sticker_set:${setName}:${Date.now()}`
        redis.zincrby(`${PREFIX}:sticker_sets`, 1, setName)
        redis.set(key, 1, 'EX', 60)
      })
    }
  }

  return next()
}
