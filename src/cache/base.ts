export abstract class Cache<T> {
  public abstract get(): Promise<T>
  public abstract update(): Promise<void>
}
