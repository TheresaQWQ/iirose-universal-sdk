import { getHookedSocket } from "../../src/iirose/ws";
import sdk from "../loader.sdk";
import render_ui from './ui/window.render.jsx'

const window = new sdk.ui.window({
  icon: {
    type: 'image',
    image: "https://s1.music.126.net/style/favicon.ico?v20180823"
  },
  title: "网易云音乐",
  id: "163music",
  size: {
    resize: true,
    width: '450px',
    height: '600px'
  }
})

window.init()

const {setKeyword} = render_ui(window.refs.body, window)

getHookedSocket(() => true, (data: string) => {
  try {
    const json = JSON.parse(data)

    if (json.m && json.mc && json.i) {
      const message = json.m as string
      // 5b0432f77047f_700751597414
      const id = `${sdk.iirose.uid()}_${json.i}`

      if (message.startsWith('!') || message.startsWith('！') && message.length > 1) {
        const keyword = message.substring(1)
        setKeyword(keyword)

        setTimeout(() => {
          const e = document.querySelector(`.msg[data-id="${id}"]`)
          e && e.remove()
        }, 100);

        return false
      }
    }
  } catch (error) {}

  return true
})

// @ts-ignore
if (module.hot) module.hot.accept()