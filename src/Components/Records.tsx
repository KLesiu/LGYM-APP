import { useState, useEffect } from "react"
import './styles/Records.css'
import JuniorRank from './img/juniorRank.png'
import IntermediateRank from './img/intermediateRank.png'
import AdvancedRank from './img/advanedRank.png'
import GIGACHADRank from './img/chadRank.png'
import ARNOLDRank from './img/arnoldRank.png'
import backgroundLGYM from './img/backgroundLGYMApp500.png'
const Records:React.FC=()=>{
    const [deadLift,setDeadLift]=useState<number>(+localStorage.getItem("dl")!)
    const [squat,setSquat]=useState<number>(+localStorage.getItem("sq")!)
    const [benchPress,setBenchPress]=useState<number>(+localStorage.getItem("bp")!)
    const [total,setTotal]=useState<number>(deadLift+squat+benchPress)
    const [rankImg,setRankImg]=useState<string>()
    const changeRank =async():Promise<void>=>{
        let rank:string 
        if(total>200 && total < 350){
            setRankImg(IntermediateRank)
            rank='Intermediate'
        } 
        else if(total>350 && total < 450){
            setRankImg(AdvancedRank)
            rank='Advanced'
        } 
        else if(total>450 && total<500){
            setRankImg(GIGACHADRank)
            rank ='GIGACHAD'
        } 
        else if(total>500){
            setRankImg(ARNOLDRank)
            rank ='ARNOLD'
        } 
        else{
            setRankImg(JuniorRank)
            rank='Junior'
        } 
        await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo/${localStorage.getItem("id")}/rank`,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                rank: rank
            })
        })
        
        
        
    }
    useEffect(()=>{
        setSquat(():number=>+localStorage.getItem("sq")!)
        setDeadLift(():number=>+localStorage.getItem('dl')!)
        setBenchPress(():number=>+localStorage.getItem('bp')!)
    },[])
    useEffect(()=>{
        setTotal(():number=>{
            const sum:number = deadLift + squat + benchPress
            return sum
        })
    },[])
    useEffect(()=>{
        changeRank()
        setTimeout(()=>document.querySelector('#recordsSection')?.classList.remove('hidden'),100)
    },[])


    return(
        <section className="hidden recordsSectionDisplay" id="recordsSection">
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            <h2>Records in powerlifting:</h2>
            <h3><div id="deadLiftIcon"></div>  Dead Lift:</h3>
            <span>{deadLift + ' kg' || "No data"}</span>
            <h3><div id="squatIcon"></div>Squat:</h3>
            <span>{squat + ' kg' || 'No data'}</span>
            <h3><div id="benchPIcon"></div>Bench press:</h3>
            <span>{benchPress + ' kg' || 'No data'}</span>
            <h2>Your total is: {total} kg</h2>
            
            {/* <div id="strengthScale">
                <h3>STRENGTH RANK: <span className="chart material-symbols-outlined">analytics</span>
                </h3> */}
                {/* <span id="scaleJunior">{`Junior (<200)`}</span>
                <span id="scaleInter">{'Intermediate (200-350)'}</span>
                <span id="scaleAdvanced">{'Advanced (350-450)'}</span>
                <span id="scaleGiga">{'GIGACHAD (450-500)'}</span>
                <span id="scaleArnold">{'ARNOLD (>500)'}</span> */}
                {/* <img id="juniorRank" src={rankImg} alt="" />
            </div> */}
        </section>
    )
}
export default Records