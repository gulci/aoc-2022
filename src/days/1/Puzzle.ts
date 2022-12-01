import Puzzle from '../../types/AbstractPuzzle'

export default class ConcretePuzzle extends Puzzle {
  getMaxCaloriesTotal(caloriesLists: number[][]) {
    let maxCaloriesTotal = 0
    caloriesLists.forEach((caloriesList) => {
      let totalCalories = 0
      caloriesList.forEach((caloryCount) => (totalCalories += caloryCount))
      if (maxCaloriesTotal < totalCalories) maxCaloriesTotal = totalCalories
    })
    return maxCaloriesTotal
  }

  getMaxCaloriesIndex(caloriesLists: number[][]) {
    let maxCaloriesIndex: number
    let maxCaloriesTotal = 0
    caloriesLists.forEach((caloriesList, index) => {
      let totalCalories = 0
      caloriesList.forEach((caloryCount) => (totalCalories += caloryCount))
      if (maxCaloriesTotal < totalCalories) {
        maxCaloriesTotal = totalCalories
        maxCaloriesIndex = index
      }
    })
    return maxCaloriesIndex
  }

  public solveFirst(): string {
    const caloriesLists: number[][] = []
    this.input.split('\n\n').forEach((listString) => {
      const caloriesList: number[] = []
      listString.split('\n').forEach((caloriesString) => {
        if (parseInt(caloriesString)) {
          caloriesList.push(parseInt(caloriesString))
        }
      })
      caloriesLists.push(caloriesList)
    })

    return this.getMaxCaloriesTotal(caloriesLists).toString()
  }

  public solveSecond(): string {
    const caloriesLists: number[][] = []
    this.input.split('\n\n').forEach((listString) => {
      const caloriesList: number[] = []
      listString.split('\n').forEach((caloriesString) => {
        if (parseInt(caloriesString)) {
          caloriesList.push(parseInt(caloriesString))
        }
      })
      caloriesLists.push(caloriesList)
    })

    const maxCaloriesList: number[] = []
    for (let index = 0; index < 3; index++) {
      const maxCalories = this.getMaxCaloriesTotal(caloriesLists)
      const maxCaloriesIndex = this.getMaxCaloriesIndex(caloriesLists)
      maxCaloriesList.push(maxCalories)
      caloriesLists.splice(maxCaloriesIndex, 1)
    }

    let maxCaloriesTotal = 0
    maxCaloriesList.forEach((maxCalories) => (maxCaloriesTotal += maxCalories))
    return maxCaloriesTotal.toString()
  }

  public getFirstExpectedResult(): string {
    return '67658'
  }

  public getSecondExpectedResult(): string {
    return '200158'
  }
}
