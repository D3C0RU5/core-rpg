import { Position } from '.'
import { rowLessThanZeroError, columnLessThanZeroError } from './errors'

const rowValue = 10
const columnValue = 20
const makePosition = () => {
  return Position.create(rowValue, columnValue)
}

describe('Position unit test', () => {
  describe('When create', () => {
    it('Should create a Position with properties', () => {
      const position = Position.create(rowValue, columnValue)

      expect(position['row']).toBe(rowValue)
      expect(position['column']).toBe(columnValue)
    })

    it('Should throw when row is less than zero', () => {
      const action = () => Position.create(-10, columnValue)

      expect(action).toThrow(rowLessThanZeroError(-10))
    })

    it('Should throw when column is less than zero', () => {
      const action = () => Position.create(rowValue, -20)

      expect(action).toThrow(columnLessThanZeroError(-20))
    })
  })

  describe('When getRowAsIndex', () => {
    it('Should return rows value', () => {
      const position = makePosition()

      expect(position.getRowAsIndex()).toBe(rowValue - 1)
    })
  })

  describe('When getColumnAsIndex', () => {
    it('Should return columns value', () => {
      const position = makePosition()

      expect(position.getColumnAsIndex()).toBe(columnValue - 1)
    })
  })

  describe('When toSnapshot', () => {
    it('Should return raw object', () => {
      const position = makePosition()

      expect(position.toSnapshot()).toEqual({
        row: rowValue,
        column: columnValue,
      })
    })
  })
})
