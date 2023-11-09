import ExerciseTraining from "../interfaces/ExerciseTrainingInterface"
type LastTrainingSession={
    createdAt:string,
    exercises:Array<ExerciseTraining>,
    type:string,
    user:string,
    __v?:number,
    _id:string
}
export default LastTrainingSession