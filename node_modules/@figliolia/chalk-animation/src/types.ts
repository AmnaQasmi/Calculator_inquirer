export type AnimationFN = (str: string, frame: number) => string;

export type AnimationName =
  | "rainbow"
  | "pulse"
  | "glitch"
  | "radar"
  | "neon"
  | "karaoke";

export type MethodLike<T = any> = (...args: any[]) => T;

export type MethodKeys<T, R = any> = keyof {
  [K in keyof T as Required<T>[K] extends MethodLike<R> ? K : never]: T[K];
};
