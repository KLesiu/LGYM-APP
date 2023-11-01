import {useState,useEffect} from 'react'
import './styles/RecordsPopUp.css'
interface RecordsPopUpProps {
    offPopUp: ()=>void
}
const RecordsPopUp:React.FC<RecordsPopUpProps> =(props)=>{
    const [error,setError]= useState('')
    const setRecords:any= async(event:Event)=>{
        event.preventDefault()
       
        const BenchPress:string|undefined = document.querySelector<HTMLInputElement>("input[name='bp']")?.value
        const Squat:string|undefined = document.querySelector<HTMLInputElement>("input[name='sq']")?.value
        const DeadLift:string|undefined = document.querySelector<HTMLInputElement>("input[name='dl']")?.value
        const id = localStorage.getItem('id')
        let BenchPressRecord:number
        let SquatRecord:number
        let DeadLifRecord:number
        try{
            if(typeof  BenchPress === 'string' && typeof DeadLift === 'string' && typeof Squat === 'string'){
                BenchPressRecord = parseFloat(BenchPress)
                SquatRecord = parseFloat(Squat)
                DeadLifRecord = parseFloat(DeadLift)
                
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/userRecords`,{
                    method:"POST",
                    headers:{
                        'content-type': "application/json"
                    },
                    body:JSON.stringify({
                        id: id,
                        sq: SquatRecord | 0,
                        dl: DeadLifRecord | 0,
                        bp: BenchPressRecord | 0
                              
                    })
        
                }).then(res=>res.json()).catch(err=>err).then(res=>res.msg)
                if(response === 'Updated') props.offPopUp()
                
            }
            
        }
        catch{
            return setError('Your values need to be FLOAT type or NUMBER type. For example 1.00 OR 1')
        }
       

    }
    return(
        <form action="" id='recordsPopUp' onSubmit={setRecords}>
            <h2>Set Your Records!</h2>
            <label htmlFor="sq">Squat:</label>
            <input type="text" name="sq" id="" />
            <label htmlFor="dl">Dead Lift:</label>
            <input type="text" name="dl" id="" />
            <label htmlFor="bp">Bench Press:</label>
            <input type="text" name="bp" id="" />
            <button type='submit' id='popUpButton'>ADD</button>
            <p>{error?error:''}</p>
        </form>
    )
}
export default RecordsPopUp