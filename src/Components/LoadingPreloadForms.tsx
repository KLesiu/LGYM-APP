import './styles/LoadingPreloadForms.css'
import {useEffect} from 'react'
const LoadingPreloadForms:React.FC=()=>{
    useEffect(()=>{
        document.querySelector('.icon-dumbellLoadingForms')?.classList.add('animationRotateForms')
    })
    return(
        <div id='loadingPreloadFormsDiv'>
            <span  className="icon-dumbellLoadingForms material-symbols-outlined">
                    exercise
            </span>
            <p className='pLoadingForms'>Loading...</p>
        </div>
    )
}
export default LoadingPreloadForms