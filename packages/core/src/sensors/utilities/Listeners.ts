export class Listeners {
  private listeners: [
    string,
    EventListenerOrEventListenerObject,
    AddEventListenerOptions | boolean | undefined
  ][] = [];

  constructor(private target: EventTarget | null) { }

  public add<T extends Event>(
    eventName: string,
    handler: (event: T) => void,
    options?: AddEventListenerOptions | boolean
  ) {
    if (this.target !== null) {
      this.target.addEventListener(eventName, handler as EventListener, options);
    }
    this.listeners.push([eventName, handler as EventListener, options]);
  }

  public removeAll = () => {
    this.listeners.forEach((listener) => {
      if (this.target !== null) {
        this.target.removeEventListener(...listener)
      }
    });
  };
}
