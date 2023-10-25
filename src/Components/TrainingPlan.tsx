import { useState } from 'react'
import './styles/TrainingPlan.css'

export interface Plan{
    trainingDays: number;
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
        <button>Create your plan now!</button>
    </div>)
    
    return(
        <section>
            {yourPlan}
        </section>
    )
}
export default TrainingPlan