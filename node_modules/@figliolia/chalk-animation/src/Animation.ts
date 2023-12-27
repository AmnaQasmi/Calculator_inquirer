import type { AnimationFN } from "./types";
import { FrameRate } from "./FrameRate";
import { Decor } from "./Decor";

export class Animation extends FrameRate {
  lines: number;
  text: string[];
  stopped = false;
  initialized = false;
  effect: AnimationFN;
  static readonly LINE_BREAKS = /\r\n|\r|\n/;
  constructor(effect: AnimationFN, str: string, delay = 0, speed = 0) {
    super(delay, speed);
    this.effect = effect;
    this.text = str.split(Animation.LINE_BREAKS);
    this.lines = this.text.length;
  }

  public render() {
    if (!this.initialized) {
      Animation.LOG("\n".repeat(this.lines - 1));
      this.initialized = true;
    }
    Animation.LOG(this.nextFrame());
    this.schedule(() => {
      if (!this.stopped) {
        this.render();
      }
    });
  }

  public nextFrame() {
    this.increment();
    return (
      "\u001B[" +
      `${this.lines}` +
      "F\u001B[G\u001B[2K" +
      this.text.map(str => this.effect(str, this.current)).join("\n")
    );
  }

  public readonly replace = Decor.chainable(this, (str: string) => {
    this.text = str.split(Animation.LINE_BREAKS);
    this.lines = this.text.length;
  });

  public readonly stop = Decor.chainable(this, () => {
    this.clearFrames();
    this.stopped = true;
  });

  public readonly start = Decor.chainable(this, () => {
    this.clearFrames();
    this.stopped = false;
    this.render();
  });
}
