import EventEmitter from "./EventEmitter";

export class Time extends EventEmitter {
  public start: number;
  public current: number;
  public elapsed: number;
  public delta: number;
  public timer: number;
  
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.timer = window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    this.timer = window.requestAnimationFrame(this.tick);
  }
}
