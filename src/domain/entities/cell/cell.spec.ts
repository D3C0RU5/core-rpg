import { Cell } from '../cell'
import { Position } from '../../value-objects/position'
import { Character } from '../character'

describe('Cell', () => {
  const position = new Position(1, 1)

  const createCell = () => Cell.create('grid-123', position, true)
  const createCharacter = () => Character.create(10, 10, 10)

  describe('constructor', () => {
    it('should recover a cell with the correct attributes', () => {
      const cellId = crypto.randomUUID()
      const cell = new Cell(cellId, 'grid-123', position, true)

      expect(cell.getId()).toBe(cellId)
      expect(cell.getGridId()).toBe('grid-123')
      expect(cell.getPosition()).toEqual(position)
      expect(cell.getWalkable()).toBe(true)
      expect(cell.getCharacter()).toBe(null)
    })
  })

  describe('create', () => {
    it('should create a cell with the correct attributes', () => {
      const cell = createCell()

      expect(cell.getId()).toBeDefined()
      expect(cell.getGridId()).toBe('grid-123')
      expect(cell.getPosition()).toEqual(position)
      expect(cell.getWalkable()).toBe(true)
    })
  })

  describe('occupied', () => {
    it('should return false when the cell has no character', () => {
      const cell = createCell()

      expect(cell.occupied()).toBe(false)
    })

    it('should return true when the cell has a character', () => {
      const cell = createCell()
      cell.addCharacter(createCharacter())

      expect(cell.occupied()).toBe(true)
    })
  })

  describe('isWalkable', () => {
    it('should return true if the cell is walkable and not occupied', () => {
      const cell = createCell()

      expect(cell.isWalkable()).toBe(true)
    })

    it('should return false if the cell is not walkable', () => {
      const nonWalkableCell = Cell.create('grid-123', position, false)

      expect(nonWalkableCell.isWalkable()).toBe(false)
    })

    it('should return false if the cell is occupied', () => {
      const cell = createCell()
      cell.addCharacter(createCharacter())

      expect(cell.isWalkable()).toBe(false)
    })
  })

  describe('addCharacter', () => {
    it('should add a character to the cell if it is walkable', () => {
      const cell = createCell()

      expect(cell.occupied()).toBe(false)
      cell.addCharacter(createCharacter())

      expect(cell.occupied()).toBe(true)
    })

    it('should not add a character if the cell is not walkable', () => {
      const nonWalkableCell = Cell.create('grid-123', position, false)

      expect(nonWalkableCell.occupied()).toBe(false)
      nonWalkableCell.addCharacter(createCharacter())

      expect(nonWalkableCell.occupied()).toBe(false)
    })

    it('should not add a character if the cell is already occupied', () => {
      const character = createCharacter()
      const occupiedCell = new Cell(
        'cell-id',
        'grid-123',
        position,
        false,
        character,
      )

      expect(occupiedCell.occupied()).toBe(true)
      occupiedCell.addCharacter(createCharacter())

      expect(occupiedCell.occupied()).toBe(true)
      expect(occupiedCell.getCharacter()?.getId()).toBe(character.getId())
    })
  })

  describe('removeCharacter', () => {
    it('should remove a character from the cell', () => {
      const cell = new Cell(
        'cell-id',
        'grid-123',
        position,
        false,
        createCharacter(),
      )

      expect(cell.occupied()).toBe(true)
      cell.removeCharacter()

      expect(cell.occupied()).toBe(false)
    })

    it('should do nothing if there is no character in the cell', () => {
      const cell = createCell()

      cell.removeCharacter()

      expect(cell.occupied()).toBe(false)
      expect(cell.getCharacter()).toBeNull()
    })
  })

  describe('getWalkable', () => {
    it('should return the correct walkable state', () => {
      const cell = createCell()

      expect(cell.getWalkable()).toBe(true)
    })
  })

  describe('getCharacter', () => {
    it('should return null if there is no character in the cell', () => {
      const cell = createCell()

      expect(cell.getCharacter()).toBeNull()
    })

    it('should return the character if there is one in the cell', () => {
      const cell = new Cell(
        'cell-id',
        'grid-123',
        position,
        false,
        createCharacter(),
      )

      expect(cell.getCharacter()).toBeDefined()
    })
  })

  describe('getId', () => {
    it('should return the correct cell ID', () => {
      const cell = createCell()

      expect(cell.getId()).toBe(cell['cellId'])
    })
  })

  describe('getGridId', () => {
    it('should return the correct grid ID', () => {
      const cell = createCell()

      expect(cell.getGridId()).toBe('grid-123')
    })
  })

  describe('getPosition', () => {
    it('should return the correct position', () => {
      const cell = createCell()

      expect(cell.getPosition()).toEqual(position)
    })
  })

  describe('toSnapshot', () => {
    it('should return a correct snapshot of the cell', () => {
      const cell = createCell()
      const snapshot = cell.toSnapshot()

      expect(snapshot.cellId).toBe(cell.getId())
      expect(snapshot.walkable).toBe(cell.getWalkable())
      expect(snapshot.position).toEqual(cell.getPosition())
      expect(snapshot.character).toBeUndefined()
    })

    it('should include the character in the snapshot if it exists', () => {
      const cell = createCell()
      cell.addCharacter(createCharacter())
      const snapshot = cell.toSnapshot()

      expect(snapshot.character).toBeDefined()
    })
  })
})
