import { useEffect, useState } from 'react'
import Loading from './Loading'
import logo from './img/logoLGYM.png'
import './styles/Preload.css'
const Preload:React.FC=()=>{
    const [quote,setQuote]=useState<boolean>(false)
    const [componentLoaded,setComponentLoaded]=useState<boolean>(false)
    const handleChange:VoidFunction=():void=>setQuote(true)
    const offLoading:VoidFunction=():void=>setComponentLoaded(true)
    useEffect(()=>{
        setTimeout(handleChange,500)
    },[])
    useEffect(()=>{
        if(quote===true){
            document.querySelector(".icon-dumbell")?.classList.add("rotate")
            document.querySelector("#quote")?.classList.add("appearance")
        } 
        },[quote])

    return(
        <section>
            {!componentLoaded?<Loading offLoading={offLoading}/>:<div id='preLoadDiv'>
                <div id='preLoadContainer'>
                
                    <img className='logoOfAPP' src={logo} alt="" />
                    <div id='loginAndRegisterPreLoadContainer'>
                        <a href='/login'><span>LOGIN</span></a>
                        <a href='/register'><span>REGISTER</span></a>
                    </div>
                    <div id='quoteContainer'>
                    <span  className="icon-dumbell material-symbols-outlined">
                    exercise
                    </span>
                    <p id='quote'>{quote===true?`'Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength. When you make an impasse passable, that is strength. But you must have ego, the kind of ego which makes you think of yourself in terms of superlatives. You must want to be the greatest. We are all starved for compliments. So we do things that get positive feedback.' (Arnold Schwarzenegger, 1982)`:""}</p>
                    </div>
                
                
                </div>
          
            
        </div>}

        </section>

    )
}
export default Preload