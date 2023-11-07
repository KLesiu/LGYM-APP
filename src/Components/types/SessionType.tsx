import Exercise from "../interfaces/ExerciseInterface"
type Session={
    symbol:string,
    date:string,
    time:string,
    exercises:Exercise[],
    notes: string
}
export default Session