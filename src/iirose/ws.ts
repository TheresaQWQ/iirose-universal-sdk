export interface IIROSEWebSocket extends WebSocket {
  _send: (data: any) => void;
  _onmessage: (data: any) => void;
}

// @ts-ignore
export const rawSocket: IIROSEWebSocket = window.socket

const hooks: {
  onmsg: ((data: any) => boolean)[],
  onsend: ((data: any) => boolean)[],
} = {
  onmsg: [],
  onsend: []
}

// Hook掉花园的websocket
export const getHookedSocket = (onmessage: (data: any) => boolean, send: (data: any) => boolean) => {
  hooks.onmsg.push(onmessage)
  hooks.onsend.push(send)

  return true
}

const originOnmessage = rawSocket._onmessage.bind(rawSocket)
const originSend = rawSocket._send.bind(rawSocket)

rawSocket._onmessage = (data: any) => {
  for (const hook of hooks.onmsg) {
    if (!hook(data)) {
      return
    }
  }

  originOnmessage(data)
}

rawSocket._send = (data: any) => {
  data.text().then((text: string) => {
    for (const hook of hooks.onsend) {
      if (!hook(text)) {
        return
      }
    }
  })

  originSend(data)
}