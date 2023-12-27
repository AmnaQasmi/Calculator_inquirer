import { Indexer } from "./Indexer";
import type { Listener, MessageMap } from "./types";

/**
 * Event Emitter
 *
 * A low-code solution for type-safe event emitting outside of
 * the global scope
 *
 * ```typescript
 * const emitter = new EventEmitter<{
 *   "event-1": number[],
 *   "event-2": Map<string, () => {}>
 * }>();
 *
 * // Subscribe to permitted events
 * const ID1 = emitter.on("event-1", list => {});
 * const ID2 = emitter.on("event-2", map => {});
 *
 * // Emit permitted events
 * emitter.emit("event-1", [1, 2, 3]);
 * emitter.emit("event-2", new Map());
 *
 * // Clean up listeners to events
 *
 * emitter.off("event-1", ID1);
 * emitter.off("event-2", ID2);
 * ```
 */
export class EventEmitter<T extends MessageMap> extends Map<
  keyof T,
  Indexer<Listener<any>>
> {
  /**
   * On
   *
   * Registers an event handler on the `EventEmitter`. Your handler will
   * be invoked each time `EventEmitter.emit()` is called with an event
   * matching your handler.
   *
   * ```typescript
   * const emitter = new EventEmitter();
   *
   * const listenerID = emitter.on("event-1", event => {
   *   console.log("event-1", event);
   * });
   *
   * // Cleaning up
   * emitter.off("event-1", listenerID);
   * ```
   */
  public on<E extends keyof T>(event: E, listener: Listener<T[E]>) {
    const index = this.get(event) || new Indexer();
    const ID = index.register(listener);
    this.set(event, index);
    return ID;
  }

  /**
   * Off
   *
   * Removes an event handler from the `EventEmitter` given an
   * event and lister ID
   */
  public off<E extends keyof T>(event: E, ID: string) {
    const index = this.get(event);
    if (index) {
      return index.delete(ID);
    }
  }

  /**
   * Emit
   *
   * Streams an event to all subscribers
   */
  public emit<E extends keyof T>(event: E, param: T[E]) {
    const index = this.get(event);
    if (index) {
      index.execute(param);
    }
  }

  /**
   * Emit
   *
   * Streams an event to all subscribers handling
   * asynchronous subscriptions as blocking tasks
   */
  public async emitBlocking<E extends keyof T>(event: E, param: T[E]) {
    const index = this.get(event);
    if (index) {
      await index.executeBlocking(param);
    }
  }
}
