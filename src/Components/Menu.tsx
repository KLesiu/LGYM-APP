import './styles/Menu.css'
import TrainingPlan from './TrainingPlan'
import Records from './Records'
import Profile from './Profile'
import History from './History'
import AddTraining from './AddTraining'
import RecordsPopUp from './RecordsPopUp';
import {useState,useEffect} from 'react'
interface MenuProps{
    viewChange:(view:any)=>void
}

const Menu:React.FC<MenuProps>=(props)=>{
    const [popUp,setPopUp]= useState<Boolean>(false)
    const chagePopUpValue=()=>{
        setPopUp(true)
    }

    const changeView=(e:React.MouseEvent)=>{
        
        const currentEvent:any = e.target
        const viewName:string = currentEvent.textContent
        
        if(viewName=== 'note') props.viewChange(<TrainingPlan/>)
        else if(viewName==='trophy') props.viewChange(<Records/>)
        else if(viewName==='account_circle') props.viewChange(<Profile/>)
        else if(viewName==='calendar_month') props.viewChange(<History/>)
        else if(viewName==='add_box') props.viewChange(<AddTraining/>)
            
            
          
        
       
    }

    const checkUserRecords=async()=>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo/${localStorage.getItem("id")}`).then(res=>res.json()).then(res=>res)
        if(response !== "Didnt find"){
            if(response.Bp && response.Dl && response.Sq ) setPopUp(true)
        }
    }
    useEffect(()=>{
        const buttons = document.querySelectorAll("button")
        if(!popUp){
            
            buttons.forEach(element => {
                if(element.id==="popUpButton") return
                else element.disabled = true
            });
        }
        else{
            buttons.forEach(element=>{
                element.disabled = false
            })
        }
        },[popUp])
    useEffect(()=>{
        checkUserRecords()
    },[])
    

    
    return(
        
        <nav>
            {!popUp?<RecordsPopUp offPopUp={chagePopUpValue}></RecordsPopUp>:''}
            <div>
            
                <button onClick={changeView}><span className=" iconNav material-symbols-outlined">
            note
            </span></button>
            </div>
            <div>
            
                <button onClick={changeView}><span className="iconNav material-symbols-outlined">
            calendar_month
            </span></button>
            </div>
            <div>
            
                <button onClick={changeView}><span className="iconNav material-symbols-outlined">
            add_box
            </span></button>
            </div>
            <div>
            
                <button onClick={changeView} ><span className="iconNav material-symbols-outlined">
            trophy
            </span></button>
            </div>
            <div>
            
                <button onClick={changeView}><span className="iconNav material-symbols-outlined">
            account_circle
            </span></button>
            </div>
            
            
        </nav>
    )
}
export default Menu