import './styles/Menu.css'
import TrainingPlan from './TrainingPlan'
import Records from './Records'
import Profile from './Profile'
import History from './History'
import AddTraining from './AddTraining'
import MenuProps from './props/MenuPropsInterface'
import UserInfo from './interfaces/UserInfoInterface'
import { useEffect } from 'react'

const Menu:React.FC<MenuProps>=(props)=>{
    const changeView=(e:React.MouseEvent<HTMLButtonElement>):void=>{
        
        
        const viewName:string = (e.target as HTMLButtonElement).textContent!
        
        if(viewName=== 'note') props.viewChange(<TrainingPlan/>)
        else if(viewName==='trophy') props.viewChange(<Records/>)
        else if(viewName==='account_circle') props.viewChange(<Profile/>)
        else if(viewName==='calendar_month') props.viewChange(<History/>)
        else if(viewName==='add_box') props.viewChange(<AddTraining/>)
            
            
          
        
       
    }
    const checkUserRecords=async():Promise<void>=>{
        const response:'Didnt find'| UserInfo = await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo/${localStorage.getItem("id")}`).then(res=>res.json()).then(res=>res)
        if(response !== "Didnt find"){
            if(response.Bp && response.Dl && response.Sq ){
                localStorage.setItem('dl',response.Dl.toString())
                localStorage.setItem('sq',response.Sq.toString())
                localStorage.setItem('bp',response.Bp.toString())
                
            } 
        }
    }
    useEffect(()=>{checkUserRecords()},[])
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