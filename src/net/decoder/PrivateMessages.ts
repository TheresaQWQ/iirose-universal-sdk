import { decode } from 'html-entities'
import { events } from '../ws'

interface data {
  timestamp: Number,
  uid: string,
  username: string,
  avatar: string,
  message: string,
  color: string,
  messageId: Number
}

export default (message: string) => {
  if (message.substr(0, 2) === '""') {
    let flag = false

    const item = message.substr(2).split('<')

    for (const msg of item) {
      const tmp = msg.split('>')

      if (tmp.length === 11) {
        if (/^\d+$/.test(tmp[0])) {
          const msg = {
            timestamp: Number(tmp[0]),
            uid: tmp[1],
            username: decode(tmp[2]),
            avatar: tmp[3],
            message: decode(tmp[4]),
            color: tmp[5],
            messageId: Number(tmp[10])
          }

          events.emit('message.private', msg)
          flag = true
        }
      }
    }

    return flag
  }
}