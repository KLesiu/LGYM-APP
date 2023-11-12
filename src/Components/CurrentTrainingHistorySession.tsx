import CurrentTrainingHistorySessionProps from "./interfaces/CurrentTrainingHistorySessionPropsInterface"
import './styles/CurrentTrainingHistorySession.css'
import {useEffect,useState} from 'react'
import Training from "./interfaces/TrainingInterface"
import ExerciseTraining from "./interfaces/ExerciseTrainingInterface"
const CurrentTrainingHistorySession:React.FC<CurrentTrainingHistorySessionProps>=(props)=>{
    const [infoAboutSession,setInfoAboutSession]=useState<JSX.Element>()
    const [exercises,setExercises]=useState<ExerciseTraining[]>()
    const [currentExercisesNumberAtPage,setCurrentExercisesNumberAtPage]=useState<number>(0)
    const getInformationAboutSession=async():Promise<void>=>{
        const response:string|Training= await props.getInformationAboutHistorySession(props.id).then(res=>res)
        if(typeof response !== 'string'){
            setExercises(response.exercises)
            setInfoAboutSession(()=><div className="sessionTrainingContainer">
                <h3>TrainingDay: {response.type}</h3>
                <div><span>Rep</span><span>Weight</span></div>
            </div>)
        }
    }
    const showCurrentExercises:VoidFunction=():void=>{

    }
    const showFirstExercises:VoidFunction=():void=>{
        const divs = document.querySelectorAll('.exerciseDiv')
        divs.forEach((ele,index)=>index<14?ele.classList.remove('hidden'):'')
        setCurrentExercisesNumberAtPage(14)
    }
    useEffect(()=>{
     getInformationAboutSession()
     if(exercises) showFirstExercises()
     
    },[])
  
    return(
        <div id="currentTrainingHistorySession">
            <h2>SessionId: {props.id}</h2>
            <p>Date: {props.date}</p>
            {infoAboutSession}
            {exercises?.map((ele,index)=><div key={index} className="exerciseDiv bottomBorderP hidden">
                
                <span>{index%2?<p className="hidden">{ele.field}</p>:<p>{ele.field.slice(0,ele.field.length-3)}</p>}  {index%2?<span >{ele.score}kg</span>:<span className="rightBorder">{ele.score}</span>}</span>
            </div>)}
        </div>

    )
}
export default CurrentTrainingHistorySession