export type UseCase = {
  execute(input: unknown): Promise<unknown>
}
