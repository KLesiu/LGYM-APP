import './styles/Home.css'
import Menu from './Menu'
import TrainingPlan from './TrainingPlan'
import {  useState } from 'react'

const Home:React.FC=()=>{
    const [view,setView]=useState(<TrainingPlan/>)
    const changeView=(view:any)=>{
       setView(view)
    }
    return(
        <main>
            <h1>LGYM APP</h1>
            {view}
            <Menu viewChange={changeView}  />
        </main>
    )
}
export default Home