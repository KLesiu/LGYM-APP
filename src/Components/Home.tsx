import './styles/Home.css'
import Menu from './Menu'
import TrainingPlan from './TrainingPlan'
import Records from './Records'
import { useState } from 'react'

const Home:React.FC=()=>{
    const [view,setView]=useState(<Records />)
    return(
        <main>
            <h1>LGYM APP</h1>
            {view || <TrainingPlan/>}
            <Menu />
        </main>
    )
}
export default Home