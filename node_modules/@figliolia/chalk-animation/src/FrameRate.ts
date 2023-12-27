import { InstanceTracker } from "./InstanceTracker";

export class FrameRate extends InstanceTracker {
  current = 0;
  speed: number;
  delay: number;
  controller: ReturnType<typeof setTimeout> | null = null;
  constructor(delay: number, speed: number) {
    super();
    this.delay = delay;
    this.speed = speed;
  }

  public schedule<F extends () => any>(func: F) {
    this.controller = setTimeout(func, this.delay / this.speed);
  }

  public increment() {
    this.current++;
  }

  public clearFrames() {
    if (this.controller) {
      clearTimeout(this.controller);
      this.controller = null;
    }
  }
}
