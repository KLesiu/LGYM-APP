import { useState, useEffect } from "react"
import './styles/Records.css'
import backgroundLGYM from './img/backgroundLGYMApp500.png'
import RecordsPopUp from "./RecordsPopUp"
const Records:React.FC=()=>{
    const [deadLift,setDeadLift]=useState<number>(+localStorage.getItem("dl")! | 0)
    const [squat,setSquat]=useState<number>(+localStorage.getItem("sq")! | 0)
    const [benchPress,setBenchPress]=useState<number>(+localStorage.getItem("bp")! | 0)
    const [total,setTotal]=useState<number>(deadLift+squat+benchPress | 0)
    const [popUp,setPopUp]=useState<boolean>(false)

    const chagePopUpValue:VoidFunction=():void=>{
        setPopUp(false)
    }

    useEffect(()=>{
        setSquat(():number=>+localStorage.getItem("sq")!)
        setDeadLift(():number=>+localStorage.getItem('dl')!)
        setBenchPress(():number=>+localStorage.getItem('bp')!)
        setTotal(():number=>{
            const sum:number = +localStorage.getItem("sq")! + +localStorage.getItem('dl')! + +localStorage.getItem('bp')!
            return sum
        })
    },[popUp])
    useEffect(()=>{
        setTimeout(()=>document.querySelector('#recordsSection')?.classList.remove('hidden'),100)
    },[])

    return(
        <section className="hidden recordsSectionDisplay" id="recordsSection">
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            <h2>Records in powerlifting:</h2>
            <h3><div id="deadLiftIcon"></div>  Dead Lift:</h3>
            <span>{deadLift + ' kg' || 0}</span>
            <h3><div id="squatIcon"></div>Squat:</h3>
            <span>{squat + ' kg' || 0}</span>
            <h3><div id="benchPIcon"></div>Bench Press:</h3>
            <span>{benchPress + ' kg' || 0}</span>
            <h2>Your total is: {total} kg</h2>
            <button id="setRecordsButton" onClick={()=>setPopUp(true)}>Update Records</button>
            {popUp?<RecordsPopUp offPopUp={chagePopUpValue}/>:''}
        </section>
    )
}
export default Records