import * as IIROSE_Vars from './iirose/vars';
import { EventEmitter } from './lib/events';
import NetworkEvents from './net'
import { SidebarItem, SidebarRoots } from './ui/sidebar';
import { WebWindow } from './ui/window';
import { FacePanel } from './ui/face';
import { events as ElementObserver } from './lib/observer';
import { icons, init as InitIcons } from './ui/icon';
import * as toast from './ui/toast'

const globalExports: {
  iirose: typeof IIROSE_Vars,
  events: {
    [index: string]: EventEmitter
  },
  ui: {
    icons: string[],
    sidebar: typeof SidebarItem,
    window: typeof WebWindow,
    face: typeof FacePanel,
    toast: {
      musicToast: typeof toast.musicToast,
      toast: typeof toast.toast
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
    icons: icons,
    sidebar: SidebarItem,
    window: WebWindow,
    face: FacePanel,
    toast: toast
  },
  test: {}
}

// @ts-ignore
window.OwOSDK = globalExports;

export default globalExports;

InitIcons();

(function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "laqp9vyrrp");

// @ts-ignore
if (module.hot) module.hot.accept();

const p = new SidebarItem(SidebarRoots.Navigation, {
  icon: {
    type: 'iirose',
    iirose: 'apps'
  },
  title: "test",
  onClick: () => {
    p.destroy()
    // alert('done')
  }
})

p.init()