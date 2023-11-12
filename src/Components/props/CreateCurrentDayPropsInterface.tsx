import Exercise from "../interfaces/ExerciseInterface"
export default interface CreateCurrentDayProps{

    day:string
    setCurrentPlanDay:React.MouseEventHandler<HTMLButtonElement>
    planA: Array<Exercise> | null
    planB: Array<Exercise> | null
    planC: Array<Exercise> | null
    planD: Array<Exercise> | null
    planE: Array<Exercise> | null
    planF: Array<Exercise> | null
    planG: Array<Exercise> | null
}