import { useState,useEffect } from 'react'
import './styles/AddTraining.css'
import uniqid from 'uniqid'
import Exercise from './interfaces/ExerciseInterface'
import ExerciseTraining from './interfaces/ExerciseTrainingInterface'
import {MouseEvent} from 'react'
import Data from './interfaces/DataPlansArraysInterface'
import addTrainingFetchType from './types/AddTrainingFetchResType'
import backgroundLGYM from './img/backgroundLGYMApp500.png'



const AddTraining=()=>{
    const [plan,setPlan]=useState<string | null>(localStorage.getItem('plan')?localStorage.getItem('plan'):'')
    const [chooseDay,setChooseDay]=useState<JSX.Element>(<div></div>)
    const [daySection,setDaySection]=useState<JSX.Element>(<div></div>)
    const [showExercise,setShowExercise]=useState<boolean>()
    const [showedCurrentExerciseNumber,setShowedCurrentExerciseNumber]=useState<number>(0)
    const [popUp,setPopUp]=useState<JSX.Element>(<div className='fromLeft popUpAddTraining'><span className="appear donePopUp material-symbols-outlined">
    done
    </span></div>)
    const [isPopUpShowed,setIsPopUpShowed]=useState<boolean>(false)
    const getInformationsAboutPlanDays:VoidFunction = async():Promise<void>=>{
        const trainingDays:number = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/configPlan`).then(res=>res.json()).catch(err=>err).then(res=>res.count)
        const helpsArray= ["A","B","C","D","E","F","G"]
        const daysArray = []
        for(let i=0;i<trainingDays;i++){
            daysArray.push(helpsArray[i])
        }
        
        setChooseDay(<div id='chooseDaySection'>
            <h2>Choose training day</h2>
            {daysArray.map(ele=><button onClick={showDaySection} className='chooseDaySectionButton' key={uniqid()}>{ele}</button>)}
        </div>)
    }
    const showDaySection=async(e:MouseEvent<HTMLButtonElement>):Promise<void>=>{        
        const day:string = (e.target as HTMLButtonElement).textContent!
        const planOfTheDay:Array<Exercise> | undefined = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/getPlan`).then(res=>res.json()).catch(err=>err).then(res=>{
            const data:Data=res.data
            if(day=== 'A') return data.planA
            else if(day=== 'B') return data.planB
            else if(day=== 'C') return data.planC
            else if(day=== 'D') return data.planD
            else if(day=== 'E') return data.planE
            else if(day=== 'F') return data.planF
            else if(day ==='G') return data.planG
        })
        setCurrentDaySection(planOfTheDay!,day)
        setChooseDay(<div></div>)

        
    }
    const setCurrentDaySection=(exercises:Array<Exercise>,day:string):void=>{
        
        setDaySection(<div id='daySection'>
            <h2 >Training <span className='currentDayOfTraining'>{day}</span> </h2>
            {exercises.map((ele:Exercise)=>{
                let helpsArray:Array<string> = []
                for(let i=1;i<+ele.series+1;i++){
                    helpsArray.push(`Series: ${i}`)
                }
                return(
                    <div key={uniqid()} className='hidden exerciseCurrentDiv'>
                        <h3>{ele.name}</h3>
                        {helpsArray.map(s=>{
                            return(
                                <div className='exerciseSeriesDiv' key={uniqid()}>
                                    <label htmlFor={`${ele.name}-${s}-rep`}>{ele.name} {s}: Rep</label>
                                    <input type="number" name={`${ele.name}-${s}-rep`} />
                                    <label htmlFor={`${ele.name}-${s}-weight`}>{ele.name} {s}: Weight (kg)</label>
                                    <input type="number" name={`${ele.name}-${s}-weigt`} />
                                </div>
                            )
                        })}
                    </div>
                )
               
               
            })}
        </div>)
        setShowExercise(true)
        
    }
    const showFirstExercise:VoidFunction=():void=>{
        const exercise: NodeListOf<Element> = document.querySelectorAll('.exerciseCurrentDiv')
        exercise[0].classList.remove('hidden')
        setShowedCurrentExerciseNumber(0)
    }
    const showNextExercise:VoidFunction=():void=>{
        if(showedCurrentExerciseNumber===document.querySelectorAll('.exerciseCurrentDiv').length-1) return alert('You are looking at the last exercise of your plan!')
        setShowedCurrentExerciseNumber(showedCurrentExerciseNumber+1)
    }
    const showPrevExercise:VoidFunction=():void=>{
        if(showedCurrentExerciseNumber===0) return alert('You are looking at first exercise of your plan!')
        setShowedCurrentExerciseNumber(showedCurrentExerciseNumber-1)
    }
    const showCurrentExercise:VoidFunction=():void=>{
        if(showedCurrentExerciseNumber===0) showFirstExercise()
        else{
            const elements = document.querySelectorAll('.exerciseCurrentDiv')
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add('hidden')
            }
            elements[showedCurrentExerciseNumber].classList.remove('hidden')
        }
    }
    const submitYourTraining:VoidFunction=():void=>{
        const inputs = document.querySelectorAll("input")
        const labels = document.querySelectorAll('label')
        const day = document.querySelector(".currentDayOfTraining")?.textContent!
        let completed = false
        inputs.forEach(ele=>{
            if(ele.value){
                completed = true
            }
            else{
                completed = false
            }
        })
        if(!completed) return alert('Complete all fields!')
        let array:Array<ExerciseTraining>=[]
        for(let i=0;i<inputs.length;i++){
            array.push({field:labels[i].textContent!,score:inputs[i].value})
        }
        
        addYourTrainingToDataBase(day,array)
    }
    const addYourTrainingToDataBase=async(day:string,training:Array<ExerciseTraining>):Promise<void>=>{
        const response:addTrainingFetchType = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/addTraining`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                day: day,
                training:training,
                createdAt:new Date().getTime(),
            })
        }).then(res=>res.json()).catch(err=>err).then(res=>res)
        if(response.msg="Training added"){
            setChooseDay(<div></div>)
            setDaySection(<div></div>)
            setShowExercise(false)
            setShowedCurrentExerciseNumber(0)
            setIsPopUpShowed(true)
            popUpTurnOn()
            
        }
    }
    const popUpTurnOn:VoidFunction=():void=>{
        setTimeout(()=>setIsPopUpShowed(false),7000)
    }
    useEffect(()=>{
        if(showExercise) showFirstExercise()
    },[showExercise])

    useEffect(()=>{
        if(showExercise) showCurrentExercise()
    },[showedCurrentExerciseNumber])
   

    
    return(
        <section id='addTrainingContainer'>
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            {plan===''?<div id='withoutPlanTrainingDiv'>
            <h2>You cant add training!</h2>
            <button className='addPlanTrainigSection'><span>You have to create plan first!</span></button>
            </div>:''}
            {plan ==='completed'?<div id='addTrainingSection'>
                    <h2>Add Training!</h2>
                    <button onClick={getInformationsAboutPlanDays} id='addTrainingButton'>
                        <span className="plusTraining material-symbols-outlined">
                            add
                        </span>
                    </button>
                    {chooseDay}
                    {daySection}
                    {showExercise?<div id='buttonsTrainingDiv'>
                        <button onClick={showPrevExercise}>
                                <span className="material-symbols-outlined">
                                    navigate_before
                                </span>
                        </button>
                        <button onClick={submitYourTraining} id='addCurrentTrainingButton'>ADD TRAINING</button>
                        <button onClick={showNextExercise}>
                                <span  className="material-symbols-outlined">
                                    navigate_next
                                </span>
                        </button>
                    </div>:''}
                    {isPopUpShowed?popUp:''}
            </div>:''}
            
            
        </section>
    )
}
export default AddTraining