import {useEffect, useState } from 'react'
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
    reps:string
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
    const [planACurrent,setPlanACurrent]=useState<Array<Exercise>>()
    const [planBCurrent,setPlanBCurrent]=useState<Array<Exercise>>()
    const [planCCurrent,setPlanCCurrent]=useState<Array<Exercise>>()
    const [planDCurrent,setPlanDCurrent]=useState<Array<Exercise>>()
    const [planECurrent,setPlanECurrent]=useState<Array<Exercise>>()
    const [planFCurrent,setPlanFCurrent]=useState<Array<Exercise>>()
    const [planGCurrent,setPlanGCurrent]=useState<Array<Exercise>>()
    const [isPlanSet,setIsPlanSet]=useState<boolean>(false)
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
    const submitPlan:any = async()=>{
       
  
        const countDivs = document.querySelectorAll('#formPlanCreate div')
        if(countDivs.length === 1) setPlan({days:[
            {trainingDay:'planA',exercises:planACurrent!}
        ]})
        else if(countDivs.length === 2) setPlan({days:[
            {trainingDay:'planA',exercises:planACurrent!},{trainingDay:'planB',exercises:planBCurrent!}
        ]})
        else if(countDivs.length === 3) setPlan({days:[
            {trainingDay:'planA',exercises:planACurrent!},{trainingDay:'planB',exercises:planBCurrent!},{trainingDay:'planC',exercises:planCCurrent!}]})
        else if(countDivs.length === 4) setPlan({days:[
            {trainingDay:'planA',exercises:planACurrent!},
            {trainingDay:'planB',exercises:planBCurrent!},
            {trainingDay:'planC',exercises:planCCurrent!},
            {trainingDay:'planD',exercises:planDCurrent!}
        ]})
        else if(countDivs.length === 5) setPlan({days:[
        {trainingDay:'planA',exercises:planACurrent!},
        {trainingDay:'planB',exercises:planBCurrent!},
        {trainingDay:'planC',exercises:planCCurrent!},
        {trainingDay:'planD',exercises:planDCurrent!},
        {trainingDay:'planE',exercises:planECurrent!}
    ]})        
        else if(countDivs.length === 6) setPlan({days:[
        {trainingDay:'planA',exercises:planACurrent!},
        {trainingDay:'planB',exercises:planBCurrent!},
        {trainingDay:'planC',exercises:planCCurrent!},
        {trainingDay:'planD',exercises:planDCurrent!},
        {trainingDay:'planE',exercises:planECurrent!},
        {trainingDay:'planF',exercises:planFCurrent!}
    ]})
        else if(countDivs.length === 7) setPlan({days:[
        {trainingDay:'planA',exercises:planACurrent!},
        {trainingDay:'planB',exercises:planBCurrent!},
        {trainingDay:'planC',exercises:planCCurrent!},
        {trainingDay:'planD',exercises:planDCurrent!},
        {trainingDay:'planE',exercises:planECurrent!},
        {trainingDay:'planF',exercises:planFCurrent!},
        {trainingDay:'planG',exercises:planGCurrent!}
    ]})
    
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
                <section id='formPlanCreate' onSubmit={submitPlan} >
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
                    
                    <button onClick={()=>setIsPlanSet(true)}>CREATE</button>
                </section>
            )
        }
            
        )

    }
 
    const setCurrentPlanDay:any=async(e:any)=>{
        const elementsName:any = document.querySelectorAll(`.${currentDay}-name`)
        const elementsSeries:any = document.querySelectorAll(`.${currentDay}-series`)
        const elementReps:any = document.querySelectorAll(`.${currentDay}-reps`)
        const arr:Array<Exercise> = []
        const day =e.target.parentElement.children[0].textContent
        
        for(let i=0;i<elementsName.length;i++){
                if(elementsName[i].value !== '' && elementReps[i].value !=="" && elementsSeries[i].value !== "0" && elementsName[i].value !== undefined && elementReps[i].value !== undefined && elementsSeries[i].value > 0) {
                    arr.push({
                        name:elementsName[i].value,
                        reps:elementReps[i].value,
                        series:parseInt(elementsSeries[i].value) 
                    })
                }}
       const currentInput:any = document.querySelector<HTMLInputElement>(`input[name='${day}']`)
       currentInput.value= 'Completed'
       if(day==='planA') setPlanACurrent(arr)
       else if(day==='planB') setPlanBCurrent(arr)
       else if(day==='planC') setPlanCCurrent(arr)
       else if(day==='planD') setPlanDCurrent(arr)
       else if(day==='planE') setPlanECurrent(arr)
       else if(day==='planF') setPlanFCurrent(arr)
       else if(day==='planG') setPlanGCurrent(arr)
       setCurrentDayCreateSection(false)
        
    }

    useEffect(()=>{
        submitPlan()
        
    },[isPlanSet])
    useEffect(()=>{
        console.log(plan)
    },[plan])
    return(
        <section id='trainingPlanSection'>
            {yourPlan}
            {planConfigSection?<CreateConfigPlan setDayAndName={setDayAndName}/>:''}
            {planCreateSection?<CreatePlan formElements={formElements}/>:''}
            {currentDayCreateSection?<CreateCurrentDay setCurrentPlanDay ={setCurrentPlanDay} day={currentDay} planA={planACurrent || null} planB={planBCurrent || null} planC={planCCurrent || null} planD={planDCurrent || null} planE={planECurrent || null} planF={planFCurrent || null} planG={planGCurrent || null} />:''}
            
        </section>
    )
}
export default TrainingPlan