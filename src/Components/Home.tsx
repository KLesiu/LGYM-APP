import './styles/Home.css'
import Menu from './Menu'
import TrainingPlan from './TrainingPlan'
import {  useState } from 'react'
import logo from './img/logo300.png'


const Home:React.FC=()=>{
    const [view,setView]=useState<JSX.Element>(<TrainingPlan/>)
    const changeView=(view:JSX.Element):void=>{
       setView(view)
    }
    return(
        <main>
            <span id='holderForLogo'><img className='logoOfHome' src={logo} alt="" /></span>
            
            {view}
            <Menu viewChange={changeView}  />
        </main>
    )
}
export default Home