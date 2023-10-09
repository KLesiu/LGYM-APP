import { useEffect, useState } from 'react'
import './styles/Preload.css'
const Preload:React.FC=()=>{
    const [quote,setQuote]=useState<boolean>(false)
    const handleChange=()=>setQuote(true)
    useEffect(()=>{
        if(quote===true){
            document.querySelector(".icon-dumbell")?.classList.add("rotate")
            document.querySelector("#quote")?.classList.add("appearance")
        } 
        },[quote])
    return(
        <div id='preLoadDiv'>
            <div id='preLoadContainer'>
                <h1>LGYM APP</h1>
                <div id='loginAndRegisterPreLoadContainer'>
                    <a href='/login'>LOGIN</a>
                    <a href='/register'>REGISTER</a>
                </div>
                
                <span onClick={handleChange} className="icon-dumbell material-symbols-outlined">
                exercise
                </span>
                <p id='quote'>{quote===true?`'Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength. When you make an impasse passable, that is strength. But you must have ego, the kind of ego which makes you think of yourself in terms of superlatives. You must want to be the greatest. We are all starved for compliments. So we do things that get positive feedback.' (Arnold Schwarzenegger, 1982)`:""}</p>
                
            </div>
            
        </div>
    )
}
export default Preload