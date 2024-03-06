import * as IIROSE_Vars from './iirose/vars';
import { EventEmitter } from './lib/events';
import NetworkEvents from './net'
import { SidebarItem, SidebarRoots } from './ui/sidebar';
import { WebWindow } from './ui/window';
import { FacePanel, FacePanelType } from './ui/face';
import { events as ElementObserver } from './lib/observer';
import { icons, init as InitIcons } from './ui/icon';
import * as toast from './ui/toast'

const globalExports: {
  iirose: typeof IIROSE_Vars,
  events: {
    [index: string]: EventEmitter
  },
  types: {
    SidebarRoots: typeof SidebarRoots,
    FacePanelType: typeof FacePanelType
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
  types: {
    SidebarRoots,
    FacePanelType
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

// @ts-ignore
if (module.hot) module.hot.accept();