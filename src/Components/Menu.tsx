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
        
        if(viewName=== 'note') props.viewChange(<TrainingPlan/>)
        else if(viewName==='trophy') props.viewChange(<Records/>)
        else if(viewName==='account_circle') props.viewChange(<Profile/>)
        else if(viewName==='calendar_month') props.viewChange(<History/>)
        else if(viewName==='add_box') props.viewChange(<AddTraining/>)
            
            
          
        
       
    }
    
    return(
        <nav>
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