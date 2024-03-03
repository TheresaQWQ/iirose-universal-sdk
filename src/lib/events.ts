export interface Listener {
  callback: (...args: any[]) => void;
  once: boolean;
}

export class EventEmitter {
  private listeners: Map<string, Listener[]> = new Map();

  on(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push({ callback, once: false });
  }

  once(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push({ callback, once: true });
  }

  off(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)!.forEach((listener, index) => {
      if (listener.callback === callback) {
        this.listeners.get(event)!.splice(index, 1);
      }
    });
  }

  emit(event: string, ...args: any[]) {
    console.log(`[EventEmitter] Emitting event: ${event}, data`, args)

    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)!.forEach((listener) => {
      listener.callback(...args);

      if (listener.once) {
        this.off(event, listener.callback);
      }
    });
  }

  removeAllListeners(event: string) {
    this.listeners.delete(event);
  }

  removeListener(event: string, callback: (...args: any[]) => void) {
    this.off(event, callback);
  }

  getListeners(event: string) {
    return this.listeners.get(event);
  }

  getEventNames() {
    return Array.from(this.listeners.keys());
  }
}