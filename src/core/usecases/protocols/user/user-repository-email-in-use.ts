export interface IUserRepositoryEmailInUse {
  isEmailInUse(value: string): Promise<boolean>
}
