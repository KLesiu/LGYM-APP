import { FormHTMLAttributes, useState } from 'react'
import CreateConfigPlan from './CreateConfigPlan';
import CreatePlan from './CreatePlan';
import CreateCurrentDay from './CreateCurrentDay';
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
        <button onClick={()=>setplanConfigSection(true)}>Create your plan now!</button>
    </div>)
    const [namePlan,setNamePlan]=useState<string>()
    const [planConfigSection,setplanConfigSection]=useState<boolean>(false)
    const [planCreateSection , setplanCreateSection ]= useState<boolean>(false)
    const [formElements,setFormElements]=useState(<form></form>)
    const [currentDayCreateSection,setCurrentDayCreateSection]= useState<boolean>(false)
    const [currentDay,setCurrentDay]=useState<string>('')
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
        }).then(res=>res.json()).catch(err=>err).then(res=>res.msg)
        if(response === 'Created'){
            setNamePlan(name)
            setplanConfigSection(false)
            setplanCreateSection (true)
            getPlanInfo()
        } 

    }
    
    const getPlanInfo = async()=>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/configPlan`).then(res=>res.json()).catch(err=>err).then(res=>res.count)
        
        const planDays:Array<string> = []
        const planDaysAll = ['planA','planB','planC','planD','planE','planF','planG']
        for(let i=0;i<response;i++){
            planDays.push(planDaysAll[i])
        }
        setFormElements(()=>{
            
            return(
                <form id='formPlanCreate' onSubmit={submitPlan}>
                    <h2>Plan creator</h2>
                    
                {planDays.map(ele=>{
                    return(
                        <div>
                            <label htmlFor={ele}>{ele}: </label>
                            <input type="text" disabled value={[]} name={ele} />
                            <button onClick={()=>{
                                setCurrentDayCreateSection(true)
                                setCurrentDay(ele)

                            }}>Set training: <span id={ele}>{ele}</span></button>
                        </div>

                    )
                })}
                <button>CREATE</button>
            </form>
            )
        }
            
        )

    }
 
    const setCurrentPlanDay=async(day:string)=>{

    }
    const submitPlan:any = async(e:Event)=>{
        e.preventDefault()
    }
    
    return(
        <section id='trainingPlanSection'>
            {yourPlan}
            {planConfigSection?<CreateConfigPlan setDayAndName={setDayAndName}/>:''}
            {planCreateSection?<CreatePlan formElements={formElements}/>:''}
            {currentDayCreateSection?<CreateCurrentDay day={currentDay} />:''}
            
        </section>
    )
}
export default TrainingPlan