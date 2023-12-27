import chalk from "chalk";
import gradient from "gradient-string";
import { Decor } from "./Decor";

export class Effects {
  public static readonly longHsv = { interpolation: "hsv", hsvSpin: "long" };
  public static readonly glitchChars =
    "x*0987654321[]0-~@#(____!!!!\\|?????....0000\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";

  @Decor.bound
  public static rainbow(str: string, frame: number) {
    const hue = 5 * frame;
    const leftColor = { h: hue % 360, s: 1, v: 1 };
    const rightColor = { h: (hue + 1) % 360, s: 1, v: 1 };
    return gradient(leftColor, rightColor)(str, this.longHsv);
  }

  @Decor.bound
  public static pulse(str: string, frame: number) {
    frame = (frame % 120) + 1;
    const transition = 6;
    const duration = 10;
    const on = "#ff1010";
    const off = "#e6e6e6";

    if (frame >= 2 * transition + duration) {
      return chalk.hex(off)(str); // All white
    }
    if (frame >= transition && frame <= transition + duration) {
      return chalk.hex(on)(str); // All red
    }

    frame =
      frame >= transition + duration
        ? 2 * transition + duration - frame
        : frame; // Revert animation

    const g =
      frame <= transition / 2
        ? gradient([
            { color: off, pos: 0.5 - frame / transition },
            { color: on, pos: 0.5 },
            { color: off, pos: 0.5 + frame / transition },
          ])
        : gradient([
            { color: off, pos: 0 },
            { color: on, pos: 1 - frame / transition },
            { color: on, pos: frame / transition },
            { color: off, pos: 1 },
          ]);

    return g(str);
  }

  @Decor.bound
  public static glitch(str: string, frame: number) {
    if (
      (frame % 2) + (frame % 3) + (frame % 11) + (frame % 29) + (frame % 37) >
      52
    ) {
      return str.replace(/[^\r\n]/g, " ");
    }

    const chunkSize = Math.max(3, Math.round(str.length * 0.02));
    const chunks = [];

    for (let i = 0, length = str.length; i < length; i++) {
      const skip = Math.round(Math.max(0, (Math.random() - 0.8) * chunkSize));
      chunks.push(str.substring(i, i + skip).replace(/[^\r\n]/g, " "));
      i += skip;
      if (str[i]) {
        if (str[i] !== "\n" && str[i] !== "\r" && Math.random() > 0.995) {
          chunks.push(
            this.glitchChars[
              Math.floor(Math.random() * this.glitchChars.length)
            ],
          );
        } else if (Math.random() > 0.005) {
          chunks.push(str[i]);
        }
      }
    }

    let result = chunks.join("");
    if (Math.random() > 0.99) {
      result = result.toUpperCase();
    } else if (Math.random() < 0.01) {
      result = result.toLowerCase();
    }

    return result;
  }

  @Decor.bound
  public static radar(str: string, frame: number) {
    const depth = Math.floor(Math.min(str.length, str.length * 0.2));
    const step = Math.floor(255 / depth);

    const globalPos = frame % (str.length + depth);

    const chars = [];
    for (let i = 0, length = str.length; i < length; i++) {
      const pos = -(i - globalPos);
      if (pos > 0 && pos <= depth - 1) {
        const shade = (depth - pos) * step;
        chars.push(chalk.rgb(shade, shade, shade)(str[i]));
      } else {
        chars.push(" ");
      }
    }

    return chars.join("");
  }

  @Decor.bound
  public static neon(str: string, frame: number) {
    const color =
      frame % 2 === 0
        ? chalk.dim.rgb(88, 80, 85)
        : chalk.bold.rgb(213, 70, 242);
    return color(str);
  }

  @Decor.bound
  public static karaoke(str: string, frame: number) {
    const chars = (frame % (str.length + 20)) - 10;
    if (chars < 0) {
      return chalk.white(str);
    }
    return (
      chalk.rgb(255, 187, 0).bold(str.substr(0, chars)) +
      chalk.white(str.substr(chars))
    );
  }
}
