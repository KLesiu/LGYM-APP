import './styles/Register.css'
import { useState} from 'react'
import React from 'react'
import uniqid from "uniqid"
import ErrorMsg from './types/ErrorType'
import ErrorRegister from './interfaces/ErrorRegisterInterface'
import logo from './img/logoLGYM.png'

const Register:React.FC=()=>{
    const [errors,setErrors]= useState<ErrorMsg[]>([])
    const register = async(event:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        event.preventDefault()
        const name:string|undefined=document.querySelector<HTMLInputElement>("input[name='username']")?.value
        const email:string|undefined=document.querySelector<HTMLInputElement>("input[name='email']")?.value
        const password:string|undefined = document.querySelector<HTMLInputElement>("input[name='password']")?.value
        const repeatPassword:string|undefined=document.querySelector<HTMLInputElement>("input[name='rpassword']")?.value
       
        if(password !== repeatPassword) return setErrors([{msg:"Both passwords need to be same"}])

        const response:ErrorRegister | any  = await fetch(`${process.env.REACT_APP_BACKEND}/api/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                cpassword:repeatPassword,
                email:email
            })
        }).then(res=>
            res.json())
          .catch(res=>
            res) 
          .then(res=>{
             if(res.msg == `${process.env.REACT_APP_MSG_REGISTER_CREATE}`){
                    setErrors([])
                    return window.location.href="/login"
                }
             else return res
            })
        
        return setErrors(response.errors)
         
    }
    return(
        <form id="register" onSubmit={register}>
            <img className='logoOfAPPRegister logoOfAPP' src={logo} alt="" />
            <label htmlFor="usernameRegister">Username</label>
            <input type="text" name="username" id='usernameRegister' autoComplete='given-name'  />
            <label htmlFor="emailRegister">Email</label>
            <input type="email" name='email' id='emailRegister' autoComplete='email' />
            <label htmlFor="passwordRegister">Password</label>
            <input type="password" name="password" id='passwordRegister' />
            <label htmlFor="rpasswordRegister">Repeat password</label>
            <input type="password" name="rpassword" id="rpasswordRegister"  />
            <button type='submit'>REGISTER</button>
            <ul>{errors?errors.map((ele:ErrorMsg)=>{
                return <li key={uniqid()}>{ele.msg}</li>
            }):''}</ul>
           
        </form>
    )
}
export default Register