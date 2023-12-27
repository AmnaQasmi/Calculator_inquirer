export type MessageMap<T = any> = Record<string, T>;

export type Listener<T> = (event: T) => void | Promise<void>;
