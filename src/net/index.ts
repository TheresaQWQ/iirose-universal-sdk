import PublicMessages from "./decoder/PublicMessages";
import PrivateMessages from "./decoder/PrivateMessages";
import LeaveRoom from "./decoder/LeaveRoom";
import JoinRoom from "./decoder/JoinRoom";
import { events } from "./ws";

export default () => {
  const decoders: ((data: any) => void)[] = [
    PublicMessages,
    PrivateMessages,
    LeaveRoom,
    JoinRoom
  ]
  
  events.on('rx', data => {
    decoders.forEach(decoder => {
      decoder(data)
    })
  })

  return events
}

// @ts-ignore
if (module.hot) module.hot.accept();