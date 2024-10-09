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

  describe('When Row', () => {
    it('Should return rows value', () => {
      const position = makePosition()

      expect(position.Row).toBe(rowValue)
    })
  })

  describe('When Column', () => {
    it('Should return columns value', () => {
      const position = makePosition()

      expect(position.Column).toBe(columnValue)
    })
  })
})
