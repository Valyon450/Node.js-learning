type EventHandler = () => void;

class MyEventEmitter {
  private eventHandlers: { [eventName: string]: EventHandler[] } = {};

  public registerHandler(eventName: string, handler: EventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(handler);
  }

  public emitEvent(eventName: string): void {
    const handlers = this.eventHandlers[eventName];

    if (handlers) {
      handlers.forEach((handler) => handler());
    }
  }
}

const emitter = new MyEventEmitter();

emitter.registerHandler('userUpdated', () => console.log('User account updated'));

emitter.emitEvent('userUpdated'); // Output: User account updated
