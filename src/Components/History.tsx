import './styles/History.css'
import { useState,useEffect } from 'react'
type Session={
    symbol:string,
    date:string,
    time:string,
    exercises:Exercise[],
    notes: string
}
type Exercise={
    name:string,
    series:number,
    rep:number,
    weight:string
}
const History:React.FC=()=>{
    const ses={
        symbol:"A",
        date: '21-02-2022',
        time:'2,5',
        exercises:[],
        notes:'Kozak'
    }
    const [sessions,setSessions]=useState<Session[]>([ses,ses,ses,ses,ses])
    const [currentSessions,setCurrentSessions]=useState<number>(3)
    useEffect(()=>{
        if(sessions.length>0){
            const sessionsContainer = document.querySelectorAll(".session")
            for(let i=0;i<sessions.length;i++){
                if(i<4) sessionsContainer[i].classList.remove('hidden')
                else return
        }
       
            

        }
    },[])
    const showNextSessions=()=>{
        const allSessions = document.querySelectorAll('.session')
        for(let i =0;i<sessions.length;i++){
            if(i>currentSessions && i<=currentSessions+4)  allSessions[i].classList.remove('hidden')
            else allSessions[i].classList.add('hidden')
        }
        setCurrentSessions(currentSessions+4)
        
    }
    
    return(
        <section id='historyContainer'>
            <h2>Training History</h2>
            {sessions.length>0? sessions.map(ele=>{
                return(
                    <div className='session hidden'>
                        <h3>Training symbol: {ele.symbol} </h3>
                        <p>Date: {ele.date} </p>
                        <p>Time: {ele.time} </p>
                        <p>Notes: {ele.notes} </p>
                    </div>
                )
            }):''}
            {sessions.length>0?<button onClick={showNextSessions}>Next</button>:''}
        </section>
    )
}
export default History