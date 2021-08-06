export const checkPercentages = (gradeComponent) => {
    let sumOfPercentages = 0
    for (let i in gradeComponent.evaluationsIds) {
        const eval_ID = gradeComponent.evaluationsIds[i]
        const currentEvaluation = gradeComponent.evaluations[eval_ID]
        sumOfPercentages += Number.parseInt(currentEvaluation.maxPercentage)
    }
    if (sumOfPercentages === 100) {
        return true
    }
    return false
}