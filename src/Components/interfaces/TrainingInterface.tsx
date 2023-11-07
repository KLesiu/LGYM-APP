import ExerciseTraining from "../interfaces/ExerciseTrainingInterface"
export default interface Training{
    user:string,
    type:string,
    exercises:Array<ExerciseTraining>,
    createdAt:string
    _id:string
}