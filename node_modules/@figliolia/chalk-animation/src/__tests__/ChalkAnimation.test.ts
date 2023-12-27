import { ChalkAnimation } from "../ChalkAnimation";
import { Effects } from "../Effects";
import { InstanceTracker } from "../InstanceTracker";

const animations = [
  "rainbow",
  "pulse",
  "glitch",
  "radar",
  "neon",
  "karaoke",
] as const;

describe("Chalk Animation", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("Spawn", () => {
    beforeAll(() => {
      jest.spyOn(InstanceTracker, "LOG").mockImplementation(() => {});
    });

    afterEach(() => {
      InstanceTracker.clearAll();
      InstanceTracker.IDs.reset();
    });

    animations.forEach(name => {
      it(`ChalkAnimation.${name} - returns an initialized animation instance`, () => {
        const animation = ChalkAnimation[name]("hello");
        expect(animation.effect).toEqual(Effects[name]);
        expect(typeof animation.ID).toEqual("string");
        expect(animation.text).toEqual(["hello"]);
        expect(animation.lines).toEqual(1);
        expect(animation.speed).toEqual(1);
        expect(animation.current).toEqual(1);
        expect(animation.initialized).toEqual(true);
        expect(animation.stopped).toEqual(false);
        expect(animation.controller).not.toEqual(null);
        expect(InstanceTracker.bucket.size).toEqual(1);
        animation.stop();
        expect(animation.stopped).toEqual(true);
        expect(animation.controller).toEqual(null);
      });

      InstanceTracker.loggers.forEach(method => {
        it(`ChalkAnimation.${name} - subsequent console.${method} stop the animation`, () => {
          const animation = ChalkAnimation[name]("hello");
          expect(animation.stopped).toEqual(false);
          console[method]("");
          expect(animation.stopped).toEqual(true);
        });
      });

      it(`ChalkAnimation.${name} - can be stopped and restarted`, () => {
        const animation = ChalkAnimation[name]("hello");
        animation.stop();
        expect(animation.stopped).toEqual(true);
        animation.start();
        expect(animation.current).toEqual(2);
      });

      it(`ChalkAnimation.${name} - can be manually rendered at a desired frame rate`, () => {
        const animation = ChalkAnimation[name]("hello").stop();
        expect(animation.current).toEqual(1);
        animation.render();
        expect(animation.current).toEqual(2);
        animation.render();
        expect(animation.current).toEqual(3);
      });

      it(`ChalkAnimation.${name} - text can be replaced`, () => {
        if (name === "radar") {
          return;
        }
        const animation = ChalkAnimation[name]("Y Y Y").stop();
        const f1 = animation.nextFrame();
        animation.replace("Z Z Z");
        const f2 = animation.nextFrame();
        expect(f1.includes("Y")).toEqual(true);
        expect(f1.includes("Z")).toEqual(false);
        expect(f2.includes("Y")).toEqual(false);
        expect(f2.includes("Z")).toEqual(true);
      });

      it(`ChalkAnimation.${name} - supports multiline strings`, () => {
        const animation = ChalkAnimation[name](
          "Lorem\nipsum\ndolor\nsit\namet",
        ).stop();
        const frame = animation.nextFrame();
        expect(animation.lines).toEqual(5);
        expect(frame.split("\n")).toHaveLength(5);
      });

      it(`ChalkAnimation.${name} - supports 5K+ frames`, () => {
        const animation = ChalkAnimation[name](
          "Lorem\nipsum\ndolor\nsit\namet",
        ).stop();
        for (let i = 0; i < 5000; i++) {
          expect(() => {
            animation.nextFrame();
          }).not.toThrow();
        }
      });
    });
  });
});
