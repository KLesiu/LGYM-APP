import {useEffect, useState } from 'react'
import CreateConfigPlan from './CreateConfigPlan';
import CreatePlan from './CreatePlan';
import CreateCurrentDay from './CreateCurrentDay';
import uniqid from 'uniqid'
import './styles/TrainingPlan.css'
import Plan from './interfaces/PlanInterface';
import Exercise from './interfaces/ExerciseInterface';
import Data from './interfaces/DataPlansArraysInterface';
import backgroundLGYM from './img/backgroundLGYMApp500.png'
import ErrorMsg from './types/ErrorType';
import Msg from './types/MsgType';

const TrainingPlan:React.FC=()=>{
    
    const [plan,setPlan]=useState<Plan>()
    const [yourPlan,setYourPlan]=useState<JSX.Element>(<div id='withoutPlanContainer'>
        <h2>You dont have any plans!</h2>
        <button onClick={()=>setplanConfigSection(true)}>Create your plan now!</button>
    </div>)
    const [namePlan,setNamePlan]=useState<string>()
    const [planConfigSection,setplanConfigSection]=useState<boolean>(false)
    const [planCreateSection , setplanCreateSection ]= useState<boolean>(false)
    const [showedPlanDay,setShowedPlanDay]=useState<number>(0)
    const [arrows,setArrows]=useState<boolean>(true)
    const [formElements,setFormElements]=useState<JSX.Element>(<form></form>)
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
    const [popUpDelete,setPopUpDelete]=useState<JSX.Element>()


    const setDayAndName = async(event:React.FormEvent):Promise<void>=>{
        event.preventDefault()
        const name:string = document.querySelector<HTMLInputElement>("input[name='name']")?.value!
        const days:string = document.querySelector<HTMLInputElement>("input[name='days']")?.value!
        const response:string = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/configPlan`,{
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
    const submitPlan = async():Promise<void>=>{
       
  
        const countDivs:NodeListOf<HTMLDivElement> = document.querySelectorAll('#formPlanCreate div')
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
    const getPlanInfo = async():Promise<void>=>{
        const response:number = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/configPlan`).then(res=>res.json()).catch(err=>err).then(res=>res.count)
        
        const planDays:Array<string> = []
        const planDaysAll:Array<string> = ['planA','planB','planC','planD','planE','planF','planG']
        for(let i=0;i<response;i++){
            planDays.push(planDaysAll[i])
        }
        setFormElements(()=>{
            
            return(
                <section id='formPlanCreate' onSubmit={submitPlan} >
                    <h2>Plan creator</h2>
         
                {planDays.map(ele=>{
                    return(
                        <div key={uniqid()}>
                            <label htmlFor={ele}>{ele}: </label>
                            <input type="text" disabled value={[]} name={ele} />
                            <button onClick={()=>{
                                setCurrentDayCreateSection(true)
                                setCurrentDay(ele)

                            }}>Set training: <span id={ele}>{ele}</span></button>
                        </div>

                    )
                })}
                   
                    <button onClick={()=>{
                        const inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll('input')
                        let auth:boolean=true
                        inputs.forEach(ele=>{
                            if(ele.value==='Uncompleted' || !ele.value) auth=false
                            
                        })
                        if(auth) setIsPlanSet(true)
                        else return alert('Complete all fields')
                        
                    }}>CREATE</button>
                </section>
            )
        }
            
        )

    }
 
    const setCurrentPlanDay:React.MouseEventHandler<HTMLButtonElement>=(e)=>{
        const elementsName:NodeListOf<HTMLInputElement> = document.querySelectorAll(`.${currentDay}-name`)
        const elementsSeries:NodeListOf<HTMLInputElement> = document.querySelectorAll(`.${currentDay}-series`)
        const elementReps:NodeListOf<HTMLInputElement> = document.querySelectorAll(`.${currentDay}-reps`)
        const arr:Array<Exercise> = []
        const day =(e.target as HTMLButtonElement).parentElement!.children[0].textContent
        
        for(let i=0;i<elementsName.length;i++){
                if(elementsName[i].value !== '' && elementReps[i].value !=="" && elementsSeries[i].value !== "0" && elementsName[i].value !== undefined && elementReps[i].value !== undefined && +elementsSeries[i].value > 0) {
                    arr.push({
                        name:elementsName[i].value,
                        reps:elementReps[i].value,
                        series:parseInt(elementsSeries[i].value) 
                    })
                }}
       const currentInput:HTMLInputElement = document.querySelector(`input[name='${day}']`)!
       currentInput.value= 'Completed'
       if(arr.length < 1) currentInput.value = "Uncompleted"
       
       if(day==='planA') setPlanACurrent(arr)
       else if(day==='planB') setPlanBCurrent(arr)
       else if(day==='planC') setPlanCCurrent(arr)
       else if(day==='planD') setPlanDCurrent(arr)
       else if(day==='planE') setPlanECurrent(arr)
       else if(day==='planF') setPlanFCurrent(arr)
       else if(day==='planG') setPlanGCurrent(arr)
       setCurrentDayCreateSection(false)
        
    }
    const setCurrentPlan=async():Promise<void>=>{
        const response: {msg:string} = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/setPlan`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                days:plan
            })

        }).then(res=>res.json()).catch(err=>err).then(res=>res)
        if(response.msg === 'Updated'){
            setplanCreateSection(false)
        }
    }
    const showOnlyFirstPlanDay:VoidFunction=():void=>{
        const elements:NodeListOf<HTMLDivElement> = document.querySelectorAll('.containerForAllExercises')
        
        for(let i=1;i<elements.length;i++){
            elements[i].classList.add('hidden')
        }
    }
    const getUserPlan = async():Promise<void>=>{
        const response:{data:Data|string}  = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/getPlan`).then(res=>res.json()).catch(err=>err).then(res=>res)
        if(response.data === 'Didnt find'){
            setIsPlanSet(false)
            setYourPlan(<div id='withoutPlanContainer'>
        <h2>You dont have any plans!</h2>
        <button onClick={()=>setplanConfigSection(true)}>Create your plan now!</button>
    </div>)
            setArrows(false)
        } 
        else{
            setIsPlanSet(true)
            const data = response.data
            if(typeof data !== 'string'){
                
                const planA = data.planA.length > 0? data.planA.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )): ''
                const planB= data.planB.length >0? data.planB.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )):''
                const planC= data.planC.length >0? data.planC.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )):''
                const planD= data.planD.length >0? data.planD.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )):''
                const planE= data.planE.length >0? data.planE.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )):''
                const planF= data.planF.length >0? data.planF.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )):''
                const planG= data.planG.length >0? data.planG.map((element:Exercise)=>(
                    <div className="exercisesContainer" key={uniqid()}>
                        <p key={uniqid()}>{element.name}</p>
                        <p key={uniqid()}>{element.series} x {element.reps}</p>
                    </div>
                )):''
                setYourPlan(()=>{
                    return(
                        <section id='planSection'>
                            {planA?<div key={uniqid()} className=" containerForAllExercises">
                                <h3>Plan A</h3>
                                {planA}
                            </div>:''}
                            {planB?<div key={uniqid()} className="hidden containerForAllExercises">
                                <h3>Plan B</h3>
                                {planB}
                            </div>:''}
                            {planC?<div key={uniqid()} className="hidden containerForAllExercises">
                                <h3>Plan C</h3>
                                {planC}
                            </div>:''}
                            {planD?<div key={uniqid()} className="hidden containerForAllExercises">
                                <h3>Plan D</h3>
                                {planD}
                            </div>:''}
                            {planE?<div key={uniqid()} className="hidden containerForAllExercises">
                                <h3>Plan E</h3>
                                {planE}
                            </div>:''}
                            {planF?<div key={uniqid()} className="hidden containerForAllExercises">
                                <h3>Plan F</h3>
                                {planF}
                            </div>:''}
                            {planG?<div key={uniqid()} className="hidden containerForAllExercises">
                                <h3>Plan G</h3>
                                {planG}
                            </div>:''}
                           
                           
                        </section>
                    )
                })
                showOnlyFirstPlanDay()
                localStorage.setItem('plan','completed')
            }
            
            

            
        
        }
    }
    const showNextPlanDay:VoidFunction=():void=>{

        if(showedPlanDay === document.querySelectorAll(".containerForAllExercises").length-1) return
        setShowedPlanDay(showedPlanDay+1)
    }
    const showPrevPlanDay:VoidFunction=():void=>{
        if(showedPlanDay===0) return
        setShowedPlanDay(showedPlanDay-1)
    }
    const showCurrentPlanDay=(showedPlanDay:number):void=>{
        const elements:NodeListOf<HTMLDivElement> = document.querySelectorAll('.containerForAllExercises')
        
        for(let i=0;i<elements.length;i++){
            if(i===showedPlanDay)  elements[i].classList.remove('hidden')
            else elements[i].classList.add('hidden')

        }
    }
    const showPopUpAboutDelete:VoidFunction=():void=>{
        setPopUpDelete(()=><div className='rightToLeft' id='popUpDelete'>
            <button onClick={deletePlan} className='show'  id='popUpYesButton'>Yes</button>
            <button onClick={()=>setPopUpDelete(<div></div>)} className='show' id='popUpNoButton'>No</button>
            <p className='show'>Are you sure to delete your Plan?</p>
            
            
        </div>)
    }
    const deletePlan=async():Promise<void>=>{
        const response:ErrorMsg | Msg = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/deletePlan`,{
            method:'DELETE'
        }).then(res=>res.json()).catch(err=>err).then(res=>res)
        setYourPlan(<div id='withoutPlanContainer'>
        <h2>You dont have any plans!</h2>
        <button onClick={()=>setplanConfigSection(true)}>Create your plan now!</button>
    </div>)
        setPopUpDelete(<div></div>)
        setIsPlanSet(false)
        setPlan(undefined)
        setArrows(false)
        return alert(response.msg)
    }
    useEffect(()=>{
        submitPlan()
        
    },[isPlanSet])
    useEffect(()=>{
       if(plan) setCurrentPlan()
       
    },[plan])
    useEffect(()=>{
        getUserPlan()
        setTimeout(()=>document.querySelector('#trainingPlanSection')?.classList.remove('hidden'),100)
        
    },[])
   
    useEffect(()=>{
        showCurrentPlanDay(showedPlanDay)
    },[showedPlanDay])
    return(
        <section className='hidden' id='trainingPlanSection'>
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            {yourPlan}
            {isPlanSet? <button id='removePlanButton' onClick={showPopUpAboutDelete}><span className="bin material-symbols-outlined">
delete
</span></button>:''}
            {popUpDelete}
            {planConfigSection?<CreateConfigPlan setDayAndName={setDayAndName}/>:''}
            {planCreateSection?<CreatePlan formElements={formElements}/>:''}
            {currentDayCreateSection?<CreateCurrentDay setCurrentPlanDay ={setCurrentPlanDay} day={currentDay} planA={planACurrent || null} planB={planBCurrent || null} planC={planCCurrent || null} planD={planDCurrent || null} planE={planECurrent || null} planF={planFCurrent || null} planG={planGCurrent || null} />:''}
            {arrows?<section className='buttonsSection'>{showedPlanDay===0?<div className='ghostDiv'></div>: <button onClick={showPrevPlanDay} id='prevDays'>
                                <span className="material-symbols-outlined">chevron_left</span>
                        </button>} 
                        { document.querySelectorAll(".containerForAllExercises").length-1 === showedPlanDay?<div className='ghostDiv'></div>: <button id='nextDays' onClick={showNextPlanDay} >
                                <span className="material-symbols-outlined">chevron_right</span>
                        </button>}
                       </section>:''}
        </section>
    )
}
export default TrainingPlan