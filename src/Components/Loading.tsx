import logo from './img/logoLGYM.png'
import './styles/Loading.css'
import {useEffect,useState} from 'react'
import LoadingProps from './interfaces/LoadingPropsInterface'
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
            <img src={logo} alt="" />
            <div className="loadingDiv">
                <div id='loadingHolder'>
                    <div id='loading'></div>
                </div>
                
                <p>Loading...</p>
            </div>
        </section>
    )
}

export default Loading