import { Cell } from '../cell'
import { Position } from '../../value-objects/position'
import { Character } from '../character'

describe('Cell', () => {
  const position = new Position({ column: 1, row: 1 })

  const createCell = () => Cell.create('grid-123', position, true)
  const createCharacter = () => Character.create(10, 10, 10)

  describe('constructor', () => {
    it('should recover a cell with the correct attributes', () => {
      const cellId = crypto.randomUUID()
      const cell = new Cell({
        cellId,
        gridId: 'grid-123',
        position,
        walkable: true,
      })

      expect(cell.Id).toBe(cellId)
      expect(cell.GridId).toBe('grid-123')
      expect(cell.Position).toEqual(position)
      expect(cell.Walkable).toBe(true)
      expect(cell.Character).toBeNull()
    })
  })

  describe('create', () => {
    it('should create a cell with the correct attributes', () => {
      const cell = createCell()

      expect(cell.Id).toBeDefined()
      expect(cell.GridId).toBe('grid-123')
      expect(cell.Position).toEqual(position)
      expect(cell.Walkable).toBe(true)
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
      const occupiedCell = new Cell({
        cellId: 'cell-id',
        gridId: 'grid-123',
        position,
        walkable: false,
        character,
      })

      expect(occupiedCell.occupied()).toBe(true)
      occupiedCell.addCharacter(createCharacter())

      expect(occupiedCell.occupied()).toBe(true)
      expect(occupiedCell.Character?.Id).toBe(character.Id)
    })
  })

  describe('removeCharacter', () => {
    it('should remove a character from the cell', () => {
      const cell = new Cell({
        cellId: 'cell-id',
        gridId: 'grid-123',
        position,
        walkable: false,
        character: createCharacter(),
      })

      expect(cell.occupied()).toBe(true)
      cell.removeCharacter()

      expect(cell.occupied()).toBe(false)
    })

    it('should do nothing if there is no character in the cell', () => {
      const cell = createCell()

      cell.removeCharacter()

      expect(cell.occupied()).toBe(false)
      expect(cell.Character).toBeNull()
    })
  })

  describe('getWalkable', () => {
    it('should return the correct walkable state', () => {
      const cell = createCell()

      expect(cell.Walkable).toBe(true)
    })
  })

  describe('getCharacter', () => {
    it('should return null if there is no character in the cell', () => {
      const cell = createCell()

      expect(cell.Character).toBeNull()
    })

    it('should return the character if there is one in the cell', () => {
      const cell = new Cell({
        cellId: 'cell-id',
        gridId: 'grid-123',
        position,
        walkable: false,
        character: createCharacter(),
      })

      expect(cell.Character).toBeDefined()
    })
  })

  describe('getId', () => {
    it('should return the correct cell ID', () => {
      const cell = createCell()

      expect(cell.Id).toBe(cell['cellId'])
    })
  })

  describe('getGridId', () => {
    it('should return the correct grid ID', () => {
      const cell = createCell()

      expect(cell.GridId).toBe('grid-123')
    })
  })

  describe('getPosition', () => {
    it('should return the correct position', () => {
      const cell = createCell()

      expect(cell.Position).toEqual(position)
    })
  })
})
