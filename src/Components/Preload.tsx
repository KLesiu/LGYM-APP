import React from 'react'
import './styles/Preload.css'
const Preload:React.FC=()=>{
    return(
        <div id='preLoadDiv'>
            <div id='preLoadContainer'>
                <h1>LGYM APP</h1>
                <div id='preLoadAContainer'>
                    <a href='/login'>LOGIN</a>
                    <a href='/register'>REGISTER</a>
                </div>

            </div>
            
        </div>
    )
}
export default Preload