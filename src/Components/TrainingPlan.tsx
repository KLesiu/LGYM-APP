import { useState } from 'react'
import CreatePlan from './CreatePlan';
import './styles/TrainingPlan.css'

export interface Plan{
    days: PlanDay[]
}

export interface PlanDay{
    trainingDay: string;
    exercises:Array<Exercise>
}
export interface Exercise{
    name:string;
    series:number,
    rep:string
}
const TrainingPlan:React.FC=()=>{
    const [plan,setPlan]=useState<Plan>()
    const [yourPlan,setYourPlan]=useState(<div id='withoutPlanContainer'>
        <h2>You dont have any plans!</h2>
        <button onClick={()=>setIsPlanCreated(true)}>Create your plan now!</button>
    </div>)
    const [namePlan,setNamePlan]=useState<string>()
    const [isPlanCreated,setIsPlanCreated]=useState<boolean>(false)
    
    return(
        <section id='trainingPlanSection'>
            {yourPlan}
            {isPlanCreated?<CreatePlan/>:''}
        </section>
    )
}
export default TrainingPlan