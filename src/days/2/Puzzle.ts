import Puzzle from '../../types/AbstractPuzzle'

const rpsEnums = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
}

const rpsGameRules: {
  [key: string]: {
    winsTo: number
    losesTo: number
    value: number
  }
} = {
  1: {
    winsTo: 3,
    losesTo: 2,
    value: 1,
  },
  2: {
    winsTo: 1,
    losesTo: 3,
    value: 2,
  },
  3: {
    winsTo: 2,
    losesTo: 1,
    value: 3,
  },
}

const codeMap: {
  [key: string]: number
} = {
  A: rpsEnums.ROCK,
  B: rpsEnums.PAPER,
  C: rpsEnums.SCISSORS,
  X: rpsEnums.ROCK,
  Y: rpsEnums.PAPER,
  Z: rpsEnums.SCISSORS,
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    let totalScore = 0

    const instructionStrings = this.input.split('\n').filter((v) => v !== '')
    instructionStrings.forEach((instructionString) => {
      const instructions = instructionString.split(' ')
      const ourChoice = codeMap[instructions[1]]
      const theirChoice = codeMap[instructions[0]]

      if (rpsGameRules[ourChoice].winsTo === theirChoice)
        totalScore += 6 + rpsGameRules[ourChoice].value
      else if (rpsGameRules[ourChoice].losesTo === theirChoice)
        totalScore += rpsGameRules[ourChoice].value
      else totalScore += 3 + rpsGameRules[ourChoice].value
    })

    return totalScore.toString()
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '14163'
  }

  public solveSecond(): string {
    let totalScore = 0

    const instructionStrings = this.input.split('\n').filter((v) => v !== '')
    instructionStrings.forEach((instructionString) => {
      const instructions = instructionString.split(' ')
      const theirChoice = codeMap[instructions[0]]
      const ourOutcomeInstruction = instructions[1]

      // we must lose
      if (ourOutcomeInstruction === 'X')
        totalScore += rpsGameRules[rpsGameRules[theirChoice].winsTo].value
      // we must draw
      else if (ourOutcomeInstruction === 'Y')
        totalScore += 3 + rpsGameRules[theirChoice].value
      // we must win
      else if (ourOutcomeInstruction === 'Z')
        totalScore += 6 + rpsGameRules[rpsGameRules[theirChoice].losesTo].value
    })

    return totalScore.toString()
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return '12091'
  }
}
