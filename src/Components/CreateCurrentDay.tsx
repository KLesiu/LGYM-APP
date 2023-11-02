import './styles/CreateCurrentDay.css'
import {useState,useEffect} from 'react'

interface CreateCurrentDayProps{
    day:string
}

const CreateCurrentDay:React.FC<CreateCurrentDayProps> =(props)=>{
    const [elements,setElements]=useState<Array<JSX.Element>>()
    const [countElements,setCountElements]=useState<number>(0)
    const addElements=()=>{
        const Element:JSX.Element = <div className='exerciseConfig'>
            <input type="text" placeholder='Exercise name' name="" className={`${props.day}-name`} />
            <input type="number" placeholder='Series' name="" className={`${props.day}-series`} />
            <input type="text" placeholder='Repetitions interval' name=""className={`${props.day}-reps`} />
            <span className="deleteCurrent material-symbols-outlined">delete</span>
        </div>
        const arr = []
        for(let i=0;i<countElements;i++)arr.push(Element)
        setElements(arr)

        
    }
    useEffect(()=>{
        addElements()
    },[countElements])
    return(
        <section id="createCurrentDaySection">
            <h2>{props.day}</h2>
            {elements?.map(ele=>ele)}
            <button onClick={()=>setCountElements(countElements+1)} id='addExerciseCurrentDayButton'><span className="material-symbols-outlined">add</span>
            </button>
        </section>
    )
}
export default CreateCurrentDay