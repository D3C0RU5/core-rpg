export type GameProps = {
  gameId: string
  ownerUserId: string
  title: string
}

export class Game {
  private readonly gameId: string
  private readonly ownerUserId: string
  private readonly title: string

  constructor(props: GameProps) {
    this.gameId = props.gameId
    this.ownerUserId = props.ownerUserId
    this.title = props.title
  }
}
