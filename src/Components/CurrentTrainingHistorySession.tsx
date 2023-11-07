import CurrentTrainingHistorySessionProps from "./interfaces/CurrentTrainingHistorySessionPropsInterface"
import './styles/CurrentTrainingHistorySession.css'
import {useEffect,useState} from 'react'
import Training from "./interfaces/TrainingInterface"
import ExerciseTraining from "./interfaces/ExerciseTrainingInterface"
const CurrentTrainingHistorySession:React.FC<CurrentTrainingHistorySessionProps>=(props)=>{
    const [infoAboutSession,setInfoAboutSession]=useState<JSX.Element>()
    const [exercises,setExercises]=useState<ExerciseTraining[]>()
    const getInformationAboutSession=async():Promise<void>=>{
        const response:string|Training= await props.getInformationAboutHistorySession(props.id).then(res=>res)
        if(typeof response !== 'string'){
            setExercises(response.exercises)
            setInfoAboutSession(()=><div className="sessionTrainingContainer">
                <h3>TrainingDay: {response.type}</h3>
                
            </div>)
        }
    }
    useEffect(()=>{
     getInformationAboutSession()
    },[])
    return(
        <div id="currentTrainingHistorySession">
            <h2>SessionId: {props.id}</h2>
            <p>Date: {props.date}</p>
            {infoAboutSession}
            {exercises?.map((ele,index)=><div key={index} className="exerciseDiv">
                
                <span>{index%2?<p className="bottomBorderP">{ele.field}</p>:<p>{ele.field}</p>} : {index%2?<p className="bottomBorderP">{ele.score}kg</p>:<p>{ele.score}</p>}</span>
            </div>)}
        </div>

    )
}
export default CurrentTrainingHistorySession