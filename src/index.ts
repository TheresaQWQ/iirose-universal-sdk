import * as IIROSE_Vars from './iirose/vars';
import { EventEmitter } from './lib/events';
import NetworkEvents from './net'
import { SidebarItem } from './ui/sidebar';
import { WebWindow } from './ui/window';
import { FacePanel, FacePanelType } from './ui/face';
import { events as ElementObserver } from './lib/observer';

const globalExports: {
  iirose: typeof IIROSE_Vars,
  events: {
    [index: string]: EventEmitter
  },
  ui: {
    [index: string]: {
      [index: string]: any
    }
  },
  test: any
} = {
  iirose: IIROSE_Vars,
  events: {
    iirose: NetworkEvents(),
    element: ElementObserver
  },
  ui: {
    sidebar: {
      ItemBlock: SidebarItem
    },
    window: {
      floatWindow: WebWindow
    },
    face: {
      panel: FacePanel
    }
  },
  test: {}
}

// @ts-ignore
window.OwOSDK = globalExports;

export default globalExports;


(function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "laqp9vyrrp");

// @ts-ignore
if (module.hot) module.hot.accept();

// const p = new FacePanel({
//   type: FacePanelType.CustomPanel,
//   title: "test"
// })

// ElementObserver.on(".emojiContentBox", () => {
//   p.init()
//   p.refs.panel.innerText = 'test'
// })