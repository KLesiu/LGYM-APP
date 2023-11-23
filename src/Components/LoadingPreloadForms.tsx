import './styles/LoadingPreloadForms.css'
import {useEffect} from 'react'
const LoadingPreloadForms:React.FC=()=>{
    useEffect(()=>{
        document.querySelector('.icon-dumbellLoadingForms')?.classList.add('animationRotateForms')
    })
    return(
        <div data-testid="loadingPreloadFormsDiv" id='loadingPreloadFormsDiv'>
            <span data-testid="loadingPreloadFormsIcon"  className="icon-dumbellLoadingForms material-symbols-outlined">
                    exercise
            </span>
            <p data-testid="loadingPreloadFormsText" className='pLoadingForms'>Loading...</p>
        </div>
    )
}
export default LoadingPreloadForms