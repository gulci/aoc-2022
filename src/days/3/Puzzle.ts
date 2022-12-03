import Puzzle from '../../types/AbstractPuzzle'

function calcPriority(character: string) {
  if (character.charCodeAt(0) >= 97) return character.charCodeAt(0) - 96
  return character.charCodeAt(0) - 38
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    let sum = 0

    const sackSets = this.input.split('\n').filter((v) => v !== '')
    sackSets.forEach((sackSet) => {
      let commonItemType: string
      const sacks = [
        sackSet.slice(0, sackSet.length / 2),
        sackSet.slice(sackSet.length / 2, sackSet.length),
      ]
      Array.from(sacks[0]).forEach((itemType) => {
        if (sacks[1].includes(itemType) && !commonItemType) {
          commonItemType = itemType
        }
      })
      sum += calcPriority(commonItemType)
    })

    return sum.toString()
  }

  public getFirstExpectedResult(): string {
    return '7850'
  }

  public solveSecond(): string {
    let sum = 0

    const sackSets = this.input.split('\n').filter((v) => v !== '')
    sackSets
      .reduce((previousValue, _, currentIndex, originalArray) => {
        if (currentIndex % 3 === 0) {
          return previousValue.concat([
            originalArray.slice(currentIndex, currentIndex + 3),
          ])
        }
        return previousValue
      }, [] as string[][])
      .forEach((elfGroupSacks) => {
        let badge: string
        Array.from(elfGroupSacks[0]).forEach((itemType) => {
          if (
            elfGroupSacks[1].includes(itemType) &&
            elfGroupSacks[2].includes(itemType) &&
            !badge
          )
            badge = itemType
        })
        sum += calcPriority(badge)
      })

    return sum.toString()
  }

  public getSecondExpectedResult(): string {
    return '2581'
  }
}
