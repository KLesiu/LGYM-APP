
import Training from "../interfaces/TrainingInterface"
export default interface CurrentTrainingHistorySessionProps{
    id:string,
    date:string,
    getInformationAboutHistorySession:(id: string) => Promise<Training | string>
    offCurrentTrainingHistorySession:VoidFunction
}