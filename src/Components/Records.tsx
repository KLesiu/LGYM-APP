import { useState, useEffect } from "react"
import './styles/Records.css'
const Records:React.FC=()=>{
    useEffect(()=>{
        setSquat(():any=>+localStorage.getItem("sq")!)
        setDeadLift(():any=>+localStorage.getItem('dl')!)
        setBenchPress(():any=>+localStorage.getItem('bp')!)
    },[])
    useEffect(()=>{
        setTotal(():number=>{
            const sum = deadLift + squat + benchPress
            return sum
        })
    })

    const [deadLift,setDeadLift]=useState<number>(0)
    const [squat,setSquat]=useState<number>(0)
    const [benchPress,setBenchPress]=useState<number>(0)
    const [total,setTotal]=useState<number>(0)
    return(
        <section id="recordsSection">
            <h2>Records in powerlifting:</h2>
            <h3><div id="deadLiftIcon"></div>  Dead Lift:</h3>
            <span>{deadLift + ' kg' || "No data"}</span>
            <h3><div id="squatIcon"></div>Squat:</h3>
            <span>{squat + ' kg' || 'No data'}</span>
            <h3><div id="benchPIcon"></div>Bench press:</h3>
            <span>{benchPress + ' kg' || 'No data'}</span>
            <h2>Your total is: {total} kg</h2>
            
            <div id="strengthScale">
                <h3>STRENGTH SCALE:</h3>
                <span id="scaleJunior">{`Junior (<250)`}</span>
                <span id="scaleInter">{'Intermediate (250-350)'}</span>
                <span id="scaleAdvanced">{'Advanced (350-450)'}</span>
                <span id="scaleGiga">{'GIGACHAD (450-500)'}</span>
                <span id="scaleArnold">{'ARNOLD (>500)'}</span>
            </div>
        </section>
    )
}
export default Records