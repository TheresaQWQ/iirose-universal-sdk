import { EventEmitter } from "./events";

export const events = new EventEmitter()

const originOn = events.on.bind(events)

const selectors: Map<string, ((...args: any[]) => void)[]> = new Map()

events.on = (event, callback) => {
  selectors.set(event, [...(selectors.get(event) || []), callback])
  return originOn(event, callback)
}

const observer = new MutationObserver((event, observer) => {
  const selectorKeys = Array.from(selectors.keys())

  for (let i = 0; i < selectorKeys.length; i++) {
    const selector = selectorKeys[i]
    const events = event.filter(item => (item.target.parentNode as HTMLElement).querySelectorAll(selector).length > 0)

    if (events.length === 0) continue
    const callbacks = selectors.get(selector)

    if (callbacks) {
      for (let j = 0; j < callbacks.length; j++) {
        const callback = callbacks[j]
        callback(event)
      }
    }
  }
});

observer.observe(document.body, { subtree: true, childList: true });