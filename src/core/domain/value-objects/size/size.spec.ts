import { Size } from '.'
import { columnsLessThanZeroError, rowsLessThanZeroError } from './errors'

const rowsValue = 10
const columnsValue = 20
const makeSize = () => {
  return Size.create(rowsValue, columnsValue)
}

describe('Size unit test', () => {
  describe('When create', () => {
    it('Should create a Size with properties', () => {
      const size = Size.create(rowsValue, columnsValue)

      expect(size['rows']).toBe(rowsValue)
      expect(size['columns']).toBe(columnsValue)
    })

    it('Should throw when row is less than zero', () => {
      const action = () => Size.create(-10, columnsValue)

      expect(action).toThrow(rowsLessThanZeroError(-10))
    })

    it('Should throw when column is less than zero', () => {
      const action = () => Size.create(rowsValue, -20)

      expect(action).toThrow(columnsLessThanZeroError(-20))
    })
  })

  describe('When Rows', () => {
    it('Should return rows value', () => {
      const size = makeSize()

      expect(size.Rows).toBe(rowsValue)
    })
  })

  describe('When Columns', () => {
    it('Should return columns value', () => {
      const size = makeSize()

      expect(size.Columns).toBe(columnsValue)
    })
  })

  describe('When toSnapshot', () => {
    it('Should return raw object', () => {
      const size = makeSize()

      expect(size.toSnapshot()).toEqual({
        rows: rowsValue,
        colums: columnsValue,
      })
    })
  })
})
