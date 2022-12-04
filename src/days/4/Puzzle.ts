import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    let encapsulatedPairsTotal = 0
    this.input
      .split('\n')
      .filter((v) => v !== '')
      .reduce((accumulator, currentValue) => {
        const pair: number[][] = []
        const assignmentPairStr = currentValue.split(',')
        assignmentPairStr.forEach((assignmentPair) => {
          pair.push(
            assignmentPair.split('-').reduce((accumulator, currentValue) => {
              return accumulator.concat(parseInt(currentValue))
            }, [] as number[])
          )
        })
        return accumulator.concat([pair])
      }, [] as number[][][])
      .forEach((assignmentPair) => {
        if (
          (assignmentPair[0][0] >= assignmentPair[1][0] &&
            assignmentPair[0][1] <= assignmentPair[1][1]) ||
          (assignmentPair[1][0] >= assignmentPair[0][0] &&
            assignmentPair[1][1] <= assignmentPair[0][1])
        ) {
          encapsulatedPairsTotal++
        }
      })
    return encapsulatedPairsTotal.toString()
  }

  public getFirstExpectedResult(): string {
    return '576'
  }

  public solveSecond(): string {
    let overlappingPairsTotal = 0
    this.input
      .split('\n')
      .filter((v) => v !== '')
      .reduce((accumulator, currentValue) => {
        const pairArrays: number[][] = []
        const pair: number[][] = []
        const assignmentPairStr = currentValue.split(',')
        assignmentPairStr.forEach((assignmentPair) => {
          pair.push(
            assignmentPair.split('-').reduce((accumulator, currentValue) => {
              return accumulator.concat(parseInt(currentValue))
            }, [] as number[])
          )
        })
        pair.forEach((pair) => {
          pairArrays.push(
            Array.from({ length: pair[1] - pair[0] + 1 }, (_, i) => i + pair[0])
          )
        })
        return accumulator.concat([pairArrays])
      }, [] as number[][][])
      .forEach((assignmentPair) => {
        if (
          assignmentPair[1].includes(assignmentPair[0][0]) ||
          assignmentPair[1].includes(assignmentPair[0][1]) ||
          assignmentPair[0].includes(assignmentPair[1][0]) ||
          assignmentPair[0].includes(assignmentPair[1][1])
        )
          overlappingPairsTotal++
      })
    return overlappingPairsTotal.toString()
  }

  public getSecondExpectedResult(): string {
    return '905'
  }
}
