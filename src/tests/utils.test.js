import { calculateTable, getAliveNeighboursCount, getCellNextState } from '../utils';

describe('get alive neighbours count, matrix 3x3', () => {
  const matrix = [
    [true, true, false],
    [false, true, false],
    [false, false, false],
  ]

  it('should have 2 alive neighbour, position [0,0]', () => {
    expect(
      getAliveNeighboursCount(0, 0, matrix)
    ).toBe(2)
  })

  it('should have 2 alive neighbour, position [0,1]', () => {
    expect(
      getAliveNeighboursCount(0, 1, matrix)
    ).toBe(2)
  })

  it('should have 2 alive neighbour, position [0,2]', () => {
    expect(
      getAliveNeighboursCount(0, 2, matrix)
    ).toBe(2)
  })

  it('should have 3 alive neighbour, position [1,0]', () => {
    expect(
      getAliveNeighboursCount(1, 0, matrix)
    ).toBe(3)
  })

  it('should have 2 alive neighbour, position [1,1]', () => {
    expect(
      getAliveNeighboursCount(1, 1, matrix)
    ).toBe(2)
  })

  it('should have 2 alive neighbour, position [1,2]', () => {
    expect(
      getAliveNeighboursCount(1, 2, matrix)
    ).toBe(2)
  })

  it('should have 1 alive neighbour, position [2,0]', () => {
    expect(
      getAliveNeighboursCount(2, 0, matrix)
    ).toBe(1)
  })

  it('should have 1 alive neighbour, position [2,1]', () => {
    expect(
      getAliveNeighboursCount(2, 1, matrix)
    ).toBe(1)
  })

  it('should have 1 alive neighbour, position [2,2]', () => {
    expect(
      getAliveNeighboursCount(2, 2, matrix)
    ).toBe(1)
  })
})

describe('get cell next state', () => {
  const matrix = [
    [false, false, false, false],
    [false, true, true, false],
    [false, true, true, false],
    [false, false, false, false],
  ]

  const matrix2 = [
    [true, false, true, false],
    [true, true, true, false],
    [false, true, true, false],
    [false, false, false, false],
  ]

  it('should return false, if alive neighbours count less than 2', () => {
    expect(
      getCellNextState(0, 0, matrix)
    ).toBe(false)
  })

  it('should return false, if alive neighbours count more than 3', () => {
    expect(
      getCellNextState(0, 1, matrix2)
    ).toBe(false)
  })

  it('should return true, if alive neighbours count equals 3 (and was false)', () => {
    expect(
      getCellNextState(1, 3, matrix2)
    ).toBe(true)
  })

  it('should return true, if alive neighbours count equals 3 (and was true)', () => {
    expect(
      getCellNextState(1, 1, matrix)
    ).toBe(true)
  })

  it('should return same state (false), if alive neighbours count equals 2', () => {
    expect(
      getCellNextState(0, 1, matrix)
    ).toBe(false)
  })

  it('should return same state (true), if alive neighbours count equals 2', () => {
    const m = [
      [true, true],
      [false, true],
    ]

    expect(
      getCellNextState(1, 1, m)
    ).toBe(true)
  })
})

describe('check example #1 (always static) from instruction', () => {


  it('should match initial matrix', () => {
    const matrix = [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ]
    const newMatrix = calculateTable(matrix)

    expect(newMatrix).toEqual(matrix)
  })
})

describe('check example #2 (blinking plus) from instruction', () => {

  const plusHorizontalPartVisible = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, true, true, true, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]

  const plusVerticalPartVisible = [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
  ]

  it('should be equal to "vertical line"', () => {
    expect(
      calculateTable(plusHorizontalPartVisible)
    ).toEqual(plusVerticalPartVisible)
  })

  it('should be equal to itself after double calculate', () => {
    expect(
      calculateTable(
        calculateTable(
          plusHorizontalPartVisible
        )
      )
    ).toEqual(plusHorizontalPartVisible)
  })
})

describe('check example #3 (repeating shape) from instruction', () => {

  const shapeOne = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, true, true, true, false],
    [false, true, true, true, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ]

  const shapeTwo = [
    [false, false, false, false, false, false],
    [false, false, false, true, false, false],
    [false, true, false, false, true, false],
    [false, true, false, false, true, false],
    [false, false, true, false, false, false],
    [false, false, false, false, false, false],
  ]

  it('should be equal to "shape two" after one calculation', () => {
    expect(
      calculateTable(shapeOne)
    ).toEqual(shapeTwo)
  })

  it('should be equal to itself after double calculate', () => {
    expect(
      calculateTable(
        calculateTable(
          shapeTwo
        )
      )
    ).toEqual(shapeTwo)
  })
})

