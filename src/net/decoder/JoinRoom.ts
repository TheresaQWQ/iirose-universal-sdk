import { events } from '../ws'
import { unescapeHtml } from '../../iirose/vars'

export interface SystemMessage {
  timestamp: number,
  avatar: string,
  username: string,
  color: string,
  uid: string,
  title: string,
  room: string
}

export default (message: string) => {
  const tmp = message.split('>')
  if (tmp.length === 12) {
    if (/\d+/.test(tmp[0])) {
      if (tmp[3] === "'1") {
        const msg = {
          timestamp: Number(tmp[0]),
          avatar: tmp[1],
          username: unescapeHtml(tmp[2]),
          color: tmp[5],
          uid: tmp[8],
          title: tmp[9],
          room: tmp[10]
        }

        events.emit('room.join', msg)
        return true
      }
    }
  }
}