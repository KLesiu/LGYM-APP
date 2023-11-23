import './styles/LoadingSection.css'
import background from './img/backgroundLGYMApp500.png'
import {useEffect} from 'react'
const LoadingSection:React.FC=()=>{
    useEffect(()=>{
        document.querySelector(".icon-dumbellLoading")?.classList.add("animationRotate")
    },[])
    return(
        <div data-testid="loadingSection" id="loadingSection">
            <img src={background} className="backgroundLGYM" alt="backgroundLGYM" />
            <div data-testid="fakeSection" id='fakeSection'>
            <span data-testid="loadingIcon"  className="icon-dumbellLoading material-symbols-outlined">
                    exercise
                    </span>
                <p>Loading...</p>
            </div>
        </div>
    )
}
export default LoadingSection