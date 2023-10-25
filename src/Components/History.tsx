import './styles/History.css'
import { useState,useEffect } from 'react'
const History:React.FC=()=>{
    const sessionSchema={
        symbol:'',
        date:'',
        time:'',
        exercises:[{
            name:'',
            series:'',
            rep:'',
            weight:''
        }],
        notes: ''
    }
    const [sessions,setSessions]=useState([sessionSchema,sessionSchema,sessionSchema,sessionSchema,sessionSchema])
    useEffect(()=>{
        const sessionsContainer = document.querySelectorAll(".session")
        for(let i=0;i<sessions.length;i++){
            if(i<4) sessionsContainer[i].classList.remove('hidden')
            else return
            

        }
    },[])
    
    return(
        <section id='historyContainer'>
            <h1>Training History</h1>
            {sessions.map(ele=>{
                return(
                    <div className='session hidden'>
                        <h2>Training symbol: {ele.symbol} </h2>
                        <p>Date: {ele.date} </p>
                        <p>Time: {ele.time} </p>
                        <p>Notes: {ele.notes} </p>
                    </div>
                )
            })}
        </section>
    )
}
export default History