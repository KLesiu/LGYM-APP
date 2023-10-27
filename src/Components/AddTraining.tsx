import { useState } from 'react'
import './styles/AddTraining.css'
const AddTraining=()=>{
    const [plan,setPlan]=useState('')
    return(
        <section id='addTrainingContainer'>
            <h2>You cant add training!</h2>
            {plan===''? <button><span>You have to create plan first!</span></button>:plan}
        </section>
    )
}
export default AddTraining