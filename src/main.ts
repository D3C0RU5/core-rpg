import { CharacterFactory } from './domain/entities/character'
import { Grid } from './domain/entities/grid'
import { Position } from './domain/entities/vo/position'

// helpers
function printGrid(grid: Grid) {
  const size = grid.getSize()

  for (let row = 1; row <= size.rows; row++) {
    const lineCells = []
    for (let column = 1; column <= size.columns; column++) {
      const cell = grid.getCell(new Position(row, column))
      lineCells.push(cell.hasCharacter(hero) ? '#' : ' ')
    }
    console.log(`|${lineCells.join('|')}|`)
  }
  console.log('-'.repeat(size.columns))
}

// core

const grid = Grid.create({ columns: 10, rows: 10 })

const hero = CharacterFactory.create('stub')

const cell = grid.getCell(Position.create(1, 1))

cell.addCharacter(hero)
printGrid(grid)

grid.moveCharacter(hero, new Position(3, 3))
printGrid(grid)

grid.moveCharacter(hero, new Position(5, 5))
printGrid(grid)
