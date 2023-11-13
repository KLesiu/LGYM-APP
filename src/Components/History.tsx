import './styles/History.css'
import { useState,useEffect } from 'react'
import uniqid from 'uniqid'
import Session from './types/SessionType'
import TrainingHistory from './interfaces/TrainingHistoryInterface'
import CurrentTrainingHistorySession from './CurrentTrainingHistorySession'
import ErrorMsg from './types/ErrorType'
import Training from './interfaces/TrainingInterface'
import backgroundLGYM from './img/backgroundLGYMApp500.png'


const History:React.FC=()=>{
    const [sessions,setSessions]=useState<Session[]>([])
    const [currentSessionsNumber,setcurrentSessionsNumber]=useState<number>(3)
    const [currentSessions,setCurrentSessions]=useState<Session[]>([])
    const [currentHistoryTrainingSession,setCurrentHistoryTrainingSession]=useState<JSX.Element>()

    const showPrevSessions:VoidFunction=():void=>{
        if(currentSessionsNumber===3) return
        const arr:Array<Session> = sessions.slice(currentSessionsNumber-7,currentSessionsNumber-3)
        
        setcurrentSessionsNumber(currentSessionsNumber-4)
        setCurrentSessions(arr)
    }
    const showNextSessions:VoidFunction=():void=>{
        if(currentSessionsNumber>=sessions.length) return
        const arr:Array<Session> = []
        for(let i=0;i<sessions.length;i++){
            if(i>currentSessionsNumber && i<=currentSessionsNumber+4) arr.push(sessions[i])
        }
    setcurrentSessionsNumber(currentSessionsNumber+4)
    setCurrentSessions(arr)
        
    }
    const getTrainingHistory=async():Promise<void>=>{
        const response:{msg:string} | TrainingHistory = await fetch(`${process.env.REACT_APP_BACKEND}/api/${localStorage.getItem("id")}/getTrainingHistory`).then(res=>res.json()).catch(err=>err).then(res=>res)
        if('trainingHistory' in response){
            
            const sessions:Array<Session>= response.trainingHistory.map(ele=>{
                let session:Session={
                    date:ele.createdAt,
                    symbol:ele.type,
                    exercises:ele.exercises,
                    id: ele._id
                }
                return session
            })
            setSessions(sessions)
            
        }
    }
    const showCurrentTrainingHistorySession=(e:React.MouseEvent<HTMLButtonElement>):void=>{
       const sessionId:string= (e.target as HTMLButtonElement).parentElement?.parentElement?.children[3].children[0].textContent!
       const date:string=(e.target as HTMLButtonElement).parentElement?.parentElement?.children[1].children[0].textContent!
       if(sessionId=== 'chevron_left') return
       setCurrentHistoryTrainingSession(<CurrentTrainingHistorySession getInformationAboutHistorySession={getInformationAboutHistorySession} offCurrentTrainingHistorySession={offCurrentTrainingHistorySession} id={sessionId} date={date}/>)
       
    }
    const getInformationAboutHistorySession=async(id:string):Promise<Training|string>=>{
        
        const response:ErrorMsg|{training:Training}= await fetch(`${process.env.REACT_APP_BACKEND}/api/${id}/getTrainingSession`).then(res=>res.json()).catch(err=>err).then(res=>res)
        if('msg' in response) return response.msg
        else return response.training
    }
    const offCurrentTrainingHistorySession:VoidFunction=():void=>{
        setCurrentHistoryTrainingSession(<div></div>)
    }

    useEffect(()=>{
        getTrainingHistory()
        setTimeout(()=>document.querySelector('#historyContainer')?.classList.remove('hidden'))
    },[])
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
     },[sessions])
    
    return(
        <section className='hidden historyContainerDisplay' id='historyContainer'>
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            <h2>Training History</h2>
            {currentSessions.length>0? currentSessions.map(ele=>{
                return(
                    <div className='session' key={uniqid()}>
                        <h3>Training symbol: {ele.symbol} </h3>
                        <p>Date: <span>{ele.date.slice(0,25)}</span>  </p>
                        <p>Series: {ele.exercises.length}</p>
                        <p>Id: <span>{ele.id}</span></p>
                        {/* <p>Notes: {ele.notes || 'none'} </p> */}
                        <button onClick={showCurrentTrainingHistorySession} className='trainingHistorySessionButton'>
                            <span className="read_more material-symbols-outlined">
                                read_more
                            </span>
                        </button>
                    </div>
                )
            }):''}
            {sessions.length>0?
            <div id='buttonHistoryContainer'>
                {currentSessionsNumber===3?<div className='ghostDiv'></div>:<button onClick={showPrevSessions} id='prevHistory'>
                <span className="material-symbols-outlined">
chevron_left
</span>
                </button>}
                {currentSessionsNumber>=sessions.length-1?<div className='ghostDiv'></div>:<button id='nextHistory' onClick={showNextSessions}><span className="material-symbols-outlined">
chevron_right
</span></button>}
                
            </div>
            :<p id='infoYouDontHaveTrainings'>You dont have training history!</p>}
            {currentHistoryTrainingSession}
        </section>
    )
}
export default History