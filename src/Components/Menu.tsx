import './styles/Menu.css'
import TrainingPlan from './TrainingPlan'
import Records from './Records'
import Profile from './Profile'
import History from './History'
import AddTraining from './AddTraining'
interface MenuProps{
    viewChange:(view:any)=>void
}

const Menu:React.FC<MenuProps>=(props)=>{

    const changeView=(e:React.MouseEvent)=>{
        
        const currentEvent:any = e.target
        const viewName:string = currentEvent.textContent
        
        if(viewName=== 'Training plan') props.viewChange(<TrainingPlan/>)
        else if(viewName==='Records') props.viewChange(<Records/>)
        else if(viewName==='Profile') props.viewChange(<Profile/>)
        else if(viewName==='History') props.viewChange(<History/>)
        else if(viewName==='Add training') props.viewChange(<AddTraining/>)
            
            
          
        
       
    }
    
    return(
        <nav>
            <div>
            <span className=" iconNav material-symbols-outlined">
            note
            </span>
                <button onClick={changeView}>Training plan</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            calendar_month
            </span>
                <button onClick={changeView}>History</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            add_box
            </span>
                <button onClick={changeView}>Add training</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            trophy
            </span>
                <button onClick={changeView} >Records</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            account_circle
            </span>
                <button onClick={changeView}>Profile</button>
            </div>
            
            
        </nav>
    )
}
export default Menu