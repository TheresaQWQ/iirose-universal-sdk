import "./ui.render.jsx"
import sdk from "../loader.sdk";
import render_ui from './ui.render.jsx'

const window = new sdk.ui.window({
  title: "数据包浏览器",
  icon: {
    type: "iirose",
    iirose: 'cog'
  },
  id: "packet-viewer",
  size: {
    width: "360px",
    height: "500px",
    resize: true
  }
})

const sidebar = new sdk.ui.sidebar(sdk.types.SidebarRoots.Tools, {
  title: "数据包浏览器",
  icon: {
    type: "iirose",
    iirose: 'cog'
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