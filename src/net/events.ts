import { EventEmitter } from "../lib/events";
import "./index"

export const events = new EventEmitter()

// @ts-ignore
if (module.hot) module.hot.accept();