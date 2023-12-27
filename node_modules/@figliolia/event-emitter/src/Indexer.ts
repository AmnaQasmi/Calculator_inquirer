import { AutoIncrementingID } from "./AutoIncrementingID";

/**
 * Indexer
 *
 * Storage for the `EventEmitter`'s listeners. The `Indexer`
 * is an extension of the map prototype that provides ordered
 * indexing of callbacks with unique identifier for each index
 */
export class Indexer<
  T extends (...args: any[]) => void | Promise<void>
> extends Map<string, T> {
  private IDs = new AutoIncrementingID();

  /**
   * Register
   *
   * Indexes a callback on the map and returns its unique
   * identifier
   */
  public register(callback: T) {
    const ID = this.IDs.get();
    this.set(ID, callback);
    return ID;
  }

  /**
   * Execute
   *
   * Iterates each lister on the map and executes it with
   * the provided parameters
   */
  public execute(...params: Parameters<T>) {
    for (const [_, listener] of this) {
      void listener(...params);
    }
  }

  /**
   * Execute Blocking
   *
   * Iterates each lister on the map and executes it. Using
   * this method with cause asynchronous operations to be
   * handled synchronously
   */
  public async executeBlocking(...params: Parameters<T>) {
    for (const [_, listener] of this) {
      await listener(...params);
    }
  }
}
