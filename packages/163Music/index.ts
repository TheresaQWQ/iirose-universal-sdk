import { addInputHook } from "../../src/iirose/MessageInput";
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

addInputHook(input => {
  if (!input.startsWith('!') && !input.startsWith('！')) {
    return false
  }

  const keyword = input.substring(1)
  setKeyword(keyword)
  return true
})

// @ts-ignore
if (module.hot) module.hot.accept()