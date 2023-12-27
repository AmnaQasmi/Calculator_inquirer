import { Effects } from "./Effects";
import { Animation } from "./Animation";
import type { AnimationName } from "./types";

/**
 * Chalk Animation
 *
 * Console animations for your CLI tools
 *
 * ```typescript
 * const animation = ChalkAnimation.rainbow("hello!");
 * animation.stop();
 * animation.start();
 * ```
 */
export class ChalkAnimation {
  public static readonly neon = this.configure("neon", 500);
  public static readonly radar = this.configure("radar", 50);
  public static readonly pulse = this.configure("pulse", 16);
  public static readonly glitch = this.configure("glitch", 55);
  public static readonly rainbow = this.configure("rainbow", 15);
  public static readonly karaoke = this.configure("karaoke", 50);

  private static configure(effect: AnimationName, delay: number) {
    return (str: string, speed = 1) => {
      if (!speed || speed <= 0) {
        throw new Error("Expected `speed` to be an number greater than 0");
      }
      return new Animation(Effects[effect], str, delay, speed).start();
    };
  }
}
