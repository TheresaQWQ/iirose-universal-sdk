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