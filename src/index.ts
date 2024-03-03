import * as IIROSE_Vars from './iirose/vars';
import NetworkEvents from './net'

const globalExports = {
  iirose: IIROSE_Vars,
  events: {
    iirose: NetworkEvents()
  }
}

// @ts-ignore
window.OwOSDK = globalExports;

export default globalExports;
