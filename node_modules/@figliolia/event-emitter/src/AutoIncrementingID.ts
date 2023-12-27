/**
 * Auto Incrementing ID
 *
 * SQL-style ID generation!
 *
 * ```typescript
 * const IDs = new AutoIncrementingID();
 *
 * const uniqueID = IDs.get();
 * ```
 */
export class AutoIncrementingID {
  private incrementor = -1;

  /**
   * Get
   *
   * Returns an auto-incrementing ID
   */
  public get() {
    return `${++this.incrementor}`;
  }

  /**
   * Reset
   *
   * Resets the `AutoIncrementingID`'s incrementor back to 0
   */
  public reset() {
    this.incrementor - 1;
  }
}
