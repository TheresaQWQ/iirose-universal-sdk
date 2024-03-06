import sdk from '../../src/index'
import render_ui from './ui/ui.render.jsx'

const window = new sdk.ui.window({
  title: "自定义媒体点播",
  icon: {
    type: "iirose",
    iirose: 'music'
  },
  id: "custom-music-player",
  size: {
    width: "320px",
    height: "400px",
    resize: true
  }
})

const sidebar = new sdk.ui.sidebar(sdk.types.SidebarRoots.Tools, {
  title: "自定义媒体点播",
  icon: {
    type: "iirose",
    iirose: 'music'
  },
  onClick: () => {
    window.show()
  }
})

sidebar.init()
window.init()

render_ui(window.refs.body)

// @ts-ignore
if (module.hot) module.hot.accept()