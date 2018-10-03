export const getMatrixArray = length => {
  const rows = []

  for (let i = 0; i < length; i++) {
    rows[i] = []

    for (let j = 0; j < length; j++) {
      rows[i].push(Math.random() > 0.5)
    }
  }

  return rows;
}

const getRowAlive = (row, cellIndex) => {
  return row
    ? !!row[cellIndex - 1] + !!row[cellIndex] + !!row[cellIndex + 1]
    : 0
}

export const getAliveNeighboursCount = (rowIndex, cellIndex, currentTable) => {
  const previousRow = currentTable[rowIndex - 1]
  const nextRow = currentTable[rowIndex + 1]
  const currentRow = currentTable[rowIndex]
  
  return getRowAlive(previousRow, cellIndex)
    + getRowAlive(nextRow, cellIndex)
    + getRowAlive(currentRow, cellIndex)
    - currentTable[rowIndex][cellIndex] // minus current cell
}

export const getCellNextState = (rowIndex, cellIndex, currentTable) => {
  const aliveNeighboursCount = getAliveNeighboursCount(rowIndex, cellIndex, currentTable)

  if (aliveNeighboursCount < 2) {
    return false
  }

  if (aliveNeighboursCount === 4) {
    return false
  }

  if (aliveNeighboursCount === 3) {
    return true
  }

  return currentTable[rowIndex][cellIndex]
}

export const calculateTable = currentTable => {

  return currentTable.map((row, rowIndex) =>
    row.map((cell, cellIndex) => getCellNextState(rowIndex, cellIndex, currentTable))
  )
}
