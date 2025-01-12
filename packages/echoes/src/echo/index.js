import deserialize from './deserialize'
import publish from '../publish'

export default function (options) {
  return {
    ...options,
    onMessage: async messageData => {
      const {message} = messageData
      const key = message.key.toString()
      if (key !== 'pink_floyd') return // not made by this library

      const data = deserialize(message.value.toString())

      const context = {
        ...messageData,
        data
      }

      const response = await options.resolve(data.params, context)

      if (!data.replyTo) return

      await publish({
        topic: data.replyTo,
        params: {
          requestId: data.requestId,
          response
        }
      })
    }
  }
}
