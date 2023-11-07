import './styles/History.css'
import { useState,useEffect } from 'react'
import uniqid from 'uniqid'
import Session from './types&interfaces/SessionType'

const History:React.FC=()=>{
    const ses={
        symbol:"A",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }
    const ses1={
        symbol:"B",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }
    const ses2={
        symbol:"C",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }
    const ses3={
        symbol:"D",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }
    const ses4={
        symbol:"E",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }
    const ses5={
        symbol:"F",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }

    const [sessions,setSessions]=useState<Session[]>([ses,ses1,ses2,ses3,ses4,ses5])
    const [currentSessionsNumber,setcurrentSessionsNumber]=useState<number>(3)
    const [currentSessions,setCurrentSessions]=useState<Session[]>([])
    useEffect(()=>{
        if(sessions.length>0){
            if(sessions.length>3){
                const arr = []
                for(let i =0;i<4;i++){
                    arr.push(sessions[i])
                }
                return setCurrentSessions(arr)
            }else{
                const arr = []
                for(let i = 0;i<sessions.length;i++){
                    arr.push(sessions[i])
                }
                return setCurrentSessions(arr)
            }
        }
     },[])
    const showPrevSessions=()=>{
        if(currentSessionsNumber===3) return
        const arr = sessions.slice(currentSessionsNumber-7,currentSessionsNumber-3)
        
        setcurrentSessionsNumber(currentSessionsNumber-4)
        setCurrentSessions(arr)
    }
    const showNextSessions=()=>{
        if(currentSessionsNumber>=sessions.length) return
        const arr = []
        for(let i=0;i<sessions.length;i++){
            if(i>currentSessionsNumber && i<=currentSessionsNumber+4) arr.push(sessions[i])
        }
    setcurrentSessionsNumber(currentSessionsNumber+4)
    setCurrentSessions(arr)
        
    }
    
    return(
        <section id='historyContainer'>
            <h2>Training History</h2>
            {currentSessions.length>0? currentSessions.map(ele=>{
                return(
                    <div className='session' key={uniqid()}>
                        <h3>Training symbol: {ele.symbol} </h3>
                        <p>Date: {ele.date} </p>
                        <p>Time: {ele.time} </p>
                        <p>Notes: {ele.notes} </p>
                    </div>
                )
            }):''}
            {sessions.length>0?
            <div id='buttonHistoryContainer'>
                <button onClick={showPrevSessions} id='prevHistory'>
                <span className="material-symbols-outlined">
chevron_left
</span>
                </button>
                <button id='nextHistory' onClick={showNextSessions}><span className="material-symbols-outlined">
chevron_right
</span></button>
            </div>
            :''}
        </section>
    )
}
export default History