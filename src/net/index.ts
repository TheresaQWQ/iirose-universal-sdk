import PublicMessages from "./decoder/PublicMessages";
import { events } from "./ws";

export default () => {
  const decoders: ((data: any) => void)[] = [
    PublicMessages
  ]
  
  events.on('rx', data => {
    decoders.forEach(decoder => {
      decoder(data)
    })
  })

  return events
}