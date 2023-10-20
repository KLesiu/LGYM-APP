import './styles/Home.css'
import Menu from './Menu'
import TrainingPlan from './TrainingPlan'
import Records from './Records'
import {  useState } from 'react'



const Home:React.FC=()=>{
    const [view,setView]=useState(<Records />)
    const changeView=(view:any)=>{
        setView(view)
    }
    return(
        <main>
            <h1>LGYM APP</h1>
            {view || <TrainingPlan/>}
            <Menu viewChange={changeView}  />
        </main>
    )
}
export default Home