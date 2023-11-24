import logo from './img/logoLGYM.png'
import './styles/Loading.css'
import {useEffect,useState} from 'react'
import LoadingProps from './props/LoadingPropsInterface'
const Loading:React.FC<LoadingProps>=(props)=>{
    const [load,setLoad]=useState<boolean>(false)
    const changeLoad:VoidFunction=():void=>setLoad(true)

    useEffect(()=>{
        setTimeout(changeLoad,500)
    },[])
    useEffect(()=>{
        if(load) document.querySelector('#loading')?.classList.add('loadAnimation')
        setTimeout(()=>{
            props.offLoading()
    }, 9000)
    },[load])

    return(
        <section id="loadingContainer">
            <img src={logo} alt="logoLoading" />
            <div data-testid="loadingDiv" className="loadingDiv">
                <div id='loadingHolder'>
                    <div data-testid="loading" id='loading'></div>
                </div>
                <p data-testid="loadingText">Loading...</p>
            </div>
        </section>
    )
}

export default Loading