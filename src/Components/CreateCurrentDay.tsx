import './styles/CreateCurrentDay.css'
import {useState,useEffect,MouseEvent} from 'react'
import uniqid from 'uniqid'

import CreateCurrentDayProps from './props/CreateCurrentDayPropsInterface'




const CreateCurrentDay:React.FC<CreateCurrentDayProps> =(props)=>{
    const [elements,setElements]=useState<Array<JSX.Element>>()
    const [countElements,setCountElements]=useState<number>(0)
    
    const removeElement=(e:MouseEvent<HTMLButtonElement>):void=>{
        const parentOfElement: HTMLDivElement=(e.target as HTMLButtonElement).parentElement as HTMLDivElement
        const inputElement1: HTMLInputElement = parentOfElement.children[0] as HTMLInputElement;
        const inputElement2: HTMLInputElement = parentOfElement.children[1] as HTMLInputElement;
        const inputElement3: HTMLInputElement = parentOfElement.children[2] as HTMLInputElement;
        parentOfElement.classList.add('hidden');
        inputElement1.value = '';
        inputElement2.value = '0';
        inputElement3.value = '';

    
        
        
    }

    
    const addElements=(day:string):void=>{
        const Element:JSX.Element = <div className='exerciseConfig'>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} />
            <input type="number" placeholder='Series' name="" className={`${props.day}-series`} />
            <input type="text" placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
            <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
        </div>
        const arr:Array<JSX.Element> = []
        if(day === 'planA'){
            if(props.planA) props.planA.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
                 <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
            <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
            <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
            <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
            </div>))
        }
        else if(day === 'planB'){
            if(props.planB) props.planB.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
       <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
       <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
       <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
       </div>))
        }
        else if(day === 'planC'){
            if(props.planC) props.planC.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
       <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
       <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
       <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
       </div>))
        }
        else if(day === 'planD'){
            if(props.planD) props.planD.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
       <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
       <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
       <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
       </div>))
        }
        else if(day === 'planE'){
            if(props.planE) props.planE.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
       <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
       <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
       <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
       </div>))
        }
        else if(day === 'planF'){
            if(props.planF) props.planF.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
       <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
       <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
       <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
       </div>))
        }
        else if(day === 'planG'){
            if(props.planG) props.planG.map(ele=>arr.push(<div className='exerciseConfig' key={uniqid()}>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} defaultValue={ele.name} />
       <input type="number" placeholder='Series' defaultValue={ele.series} name="" className={`${props.day}-series`} />
       <input type="text" defaultValue={ele.reps} placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
       <span onClick={removeElement} className="deleteCurrent material-symbols-outlined">delete</span>
       </div>))
        }      
        for(let i=0;i<countElements;i++)arr.push(Element)
        setElements(arr)

        
    }
    useEffect(()=>{
        addElements(props.day)
    },[countElements])
    return(
        <section id="createCurrentDaySection">
            <h2>{props.day}</h2>
            {elements?.map(ele=>ele)}
            <button onClick={()=>setCountElements(countElements+1)} id='addExerciseCurrentDayButton'><span className="material-symbols-outlined">add</span>
            </button>
            <button onClick={props.setCurrentPlanDay} id='readyButton'>READY!</button>
        </section>
    )
}
export default CreateCurrentDay