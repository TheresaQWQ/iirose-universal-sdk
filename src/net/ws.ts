import { EventEmitter } from "../lib/events";
import { getHookedSocket } from "../iirose/ws";

export const events = new EventEmitter()

getHookedSocket(
  (data) => {
    events.emit('rx', data)
    return true
  },
  (data) => {
    events.emit('tx', data)
    return true
  }
)

// @ts-ignore
if (module.hot) module.hot.accept();