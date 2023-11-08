import './styles/LoadingSection.css'
import background from './img/backgroundLGYMApp500.png'
import {useEffect} from 'react'
const LoadingSection:React.FC=()=>{
    useEffect(()=>{
        document.querySelector(".icon-dumbellLoading")?.classList.add("animationRotate")
    },[])
    return(
        <div id="loadingSection">
            <img src={background} className="backgroundLGYM" />
            <div id='fakeSection'>
            <span  className="icon-dumbellLoading material-symbols-outlined">
                    exercise
                    </span>
                <p>Loading...</p>
            </div>
        </div>
    )
}
export default LoadingSection