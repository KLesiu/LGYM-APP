import {useState} from 'react'
import './styles/RecordsPopUp.css'
import RecordsPopUpProps from './props/RecordsPopUpPropsInterface'
import ErrorMsg from './types/ErrorType'

const RecordsPopUp:React.FC<RecordsPopUpProps> =(props)=>{
    const [error,setError]= useState<ErrorMsg>()
    
    const setRecords = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const BenchPress:string|undefined = document.querySelector<HTMLInputElement>("input[name='bp']")?.value
        const Squat:string|undefined = document.querySelector<HTMLInputElement>("input[name='sq']")?.value
        const DeadLift:string|undefined = document.querySelector<HTMLInputElement>("input[name='dl']")?.value
        const id:string = localStorage.getItem('id')!
        let BenchPressRecord:number
        let SquatRecord:number
        let DeadLifRecord:number
        try{
            if(typeof  BenchPress === 'string' && typeof DeadLift === 'string' && typeof Squat === 'string'){
                BenchPressRecord = parseFloat(BenchPress)
                SquatRecord = parseFloat(Squat)
                DeadLifRecord = parseFloat(DeadLift)
                
                const response:string = await fetch(`${process.env.REACT_APP_BACKEND}/api/userRecords`,{
                    method:"POST",
                    headers:{
                        'content-type': "application/json"
                    },
                    body:JSON.stringify({
                        id: id,
                        sq: SquatRecord || 0,
                        dl: DeadLifRecord || 0,
                        bp: BenchPressRecord || 0
                              
                    })
        
                }).then(res=>res.json()).catch(err=>err).then(res=>res.msg)
                if(response === 'Updated'){
                    localStorage.setItem('dl',`${DeadLifRecord}`)
                    localStorage.setItem('sq',`${SquatRecord}`)
                    localStorage.setItem('bp',`${BenchPressRecord}`)
                    props.offPopUp()
                } 
                
            }
            
        }
        catch{
            return setError({msg:'Your values need to be FLOAT type or NUMBER type. For example 1.00 OR 1'})
        }
       

    }

    return(
        <form action="" id='recordsPopUp' onSubmit={setRecords}>
            <h2>Set Your Records!</h2>
            <label htmlFor="sq">Squat:</label>
            <input type="text" name="sq"  />
            <label htmlFor="dl">Dead Lift:</label>
            <input type="text" name="dl"  />
            <label htmlFor="bp">Bench Press:</label>
            <input type="text" name="bp"  />
            <button type='submit' id='popUpButton'>ADD</button>
            <p>{error?error.msg:''}</p>
        </form>
    )
}
export default RecordsPopUp