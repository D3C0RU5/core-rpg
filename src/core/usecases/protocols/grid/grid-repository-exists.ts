export interface IGridRepositoryExists {
  exists(gridId: string): Promise<boolean>
}
