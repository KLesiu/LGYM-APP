import { FormHTMLAttributes, useState } from 'react'
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
    const setDayAndName:any = async(event:React.FormEvent)=>{
        event.preventDefault()
        const name = document.querySelector<HTMLInputElement>("input[name='name']")?.value
        const days = document.querySelector<HTMLInputElement>("input[name='days']")?.value
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/configPlan`,{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
                name:name,
                days:days
            })
        }).then(res=>res.json()).catch(err=>err).then(res=>console.log(res))

    }
    
    return(
        <section id='trainingPlanSection'>
            {yourPlan}
            {isPlanCreated?<CreatePlan setDayAndName={setDayAndName}/>:''}
        </section>
    )
}
export default TrainingPlan