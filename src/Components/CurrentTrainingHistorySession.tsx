import CurrentTrainingHistorySessionProps from "./props/CurrentTrainingHistorySessionPropsInterface"
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
            showFirstExercises()
        }
    }
    const showCurrentExercises=(number:number):void=>{
        if(number===14) return showFirstExercises()
        
        const divs = document.querySelectorAll('.exerciseDiv')
        if(number>divs.length+14) return setCurrentExercisesNumberAtPage(number-14)
       
        for(let i:number=0;i<divs.length;i++){
            if(i>=number-14&&i<number) divs[i].classList.remove('hidden')
            else divs[i].classList.add('hidden')
        }
    }
    const showFirstExercises:VoidFunction=():void=>{
        const divs = document.querySelectorAll('.exerciseDiv')
        divs.forEach((ele,index:number)=>index<14?ele.classList.remove('hidden'):ele.classList.add('hidden'))
        setCurrentExercisesNumberAtPage(14)
    }
    useEffect(()=>{
     getInformationAboutSession()
     
     
    },[])
    useEffect(()=>{
        showCurrentExercises(currentExercisesNumberAtPage)
    },[currentExercisesNumberAtPage])
  
    return(
        <div id="currentTrainingHistorySession">
            {/* <h2>SessionId: {props.id}</h2> */}
            <button onClick={props.offCurrentTrainingHistorySession} className="closeCurrentTrainingHistorySession"><span className="material-symbols-outlined">close</span></button>
            <h2 id="dateHistorySection">Date : {props.date}</h2>
            {infoAboutSession}
            {exercises?.map((ele,index)=><div key={index} className="exerciseDiv bottomBorderP hidden">
                
                <span>{index%2?<p className="hidden">{ele.field}</p>:<p>{ele.field.slice(0,ele.field.length-3)}</p>}  {index%2?<span >{ele.score}kg</span>:<span className="rightBorder">{ele.score}</span>}</span>
                
            </div>)}
            {exercises?<div className="buttonsSectionHistorySession">
                <button onClick={()=>{
                    if(currentExercisesNumberAtPage===14) return
                    setCurrentExercisesNumberAtPage(currentExercisesNumberAtPage-14)}}><span className="material-symbols-outlined">chevron_left</span></button>
                <button onClick={()=>setCurrentExercisesNumberAtPage(currentExercisesNumberAtPage+14)}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>:''}
        </div>

    )
}
export default CurrentTrainingHistorySession