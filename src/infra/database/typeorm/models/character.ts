import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Character } from '../../../../core/domain/entities/character'

@Entity({ name: 'characters' })
export class CharacterModel extends BaseEntity {
  @PrimaryColumn()
  characterId!: string

  @Column()
  health!: number

  @Column()
  movimentation!: number

  @Column()
  strength!: number

  mapToEntity = () => {
    return new Character({
      characterId: this.characterId,
      health: this.health,
      movimentation: this.movimentation,
      strength: this.strength,
    })
  }
}
