import Exercise from "../types&interfaces/ExerciseInterface"
export default interface CreateCurrentDayProps{

    day:string
    setCurrentPlanDay:()=>void
    planA: Array<Exercise> | null
    planB: Array<Exercise> | null
    planC: Array<Exercise> | null
    planD: Array<Exercise> | null
    planE: Array<Exercise> | null
    planF: Array<Exercise> | null
    planG: Array<Exercise> | null
}