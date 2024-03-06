import { IIROSEWebSocket } from "./ws"

// uid
export const uid = () => {
  // @ts-ignore
  return window.uid
}

// 用户名
export const username = () => {
  const e = document.querySelector("#functionHolderInfoName")
  return e ? e.innerHTML : ''
}

// 颜色
export const color = () => {
  // @ts-ignore
  return window.namecolor
}

const allSounds = Object.keys(window).filter(k => k.endsWith('soundprobe')).map(s => s.slice(0, -10))

export const sounds = () => {
  return allSounds
}

export const playSound = (sound: string) => {
  const soundName: string = sound
  if (allSounds.includes(soundName)) {
    const k = `${soundName}sound` as any
    const e = window[k] as unknown as any
    if (e) {
      return e.play()
    } else {
      return Promise.reject(new Error(`Sound ${sound} not playable`))
    }
  }

  return Promise.reject(new Error(`Sound ${sound} not found`))
}

// @ts-ignore
export const uniqueId = () => window.Utils.smallTools.uniqueID() // 获取唯一ID

// @ts-ignore
if (module.hot) module.hot.accept();

export const room = {
  get raw() {
    // @ts-ignore
    return window.Objs.mapHolder.Assets.roomJson[window.roomn]
  },

  // 房间id
  get id() {
    const list = room.raw[0].split('_')
    return list[list.length - 1]
  },

  // 房间名
  get name() {
    return room.raw[1]
  },

  // 房间主题色
  get color() {
    return room.raw[2]
  },

  // 房间类型
  get type(): "Video" | "Music" | "Normal" | "MusicShare" | "VideoShare" {
    // @ts-ignore
    const typeMap = {
      '200': 'VideoShare',
      '100': 'MusicShare',
      '000': "Normal",
      '300': "Music",
      '400': "Video"
    }

    // @ts-ignore
    return typeMap[room.raw[3]]
  }
}

// @ts-ignore
export const socket: IIROSEWebSocket = window.socket

export const unescapeHtml = (str: string) => {
  // @ts-ignore
  return window.unhtmlspecialcharsAll(str)
}