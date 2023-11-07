import './styles/Register.css'
import { useState} from 'react'
import React from 'react'
import uniqid from "uniqid"
import ErrorMsg from './types&interfaces/ErrorType'

const Register:React.FC=()=>{
    const [errors,setErrors]:any= useState<ErrorMsg[]>([])
    const register:any = async(event:Event)=>{
        event.preventDefault()
        const name:string|undefined=document.querySelector<HTMLInputElement>("input[name='username']")?.value
        const email:string|undefined=document.querySelector<HTMLInputElement>("input[name='email']")?.value
        const password:string|undefined = document.querySelector<HTMLInputElement>("input[name='password']")?.value
        const repeatPassword:string|undefined=document.querySelector<HTMLInputElement>("input[name='rpassword']")?.value
       
        if(password !== repeatPassword) return setErrors([{msg:"Both passwords need to be same"}])

        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/register`,{
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
            <h1>REGISTER TO LGYM APP</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"  />
            <label htmlFor="email">Email</label>
            <input type="email" name='email' />
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  />
            <label htmlFor="rpassword">Repeat password</label>
            <input type="password" name="rpassword"  />
            <button type='submit'>REGISTER</button>
            <ul>{errors?errors.map((ele:ErrorMsg)=>{
                return <li key={uniqid()}>{ele.msg}</li>
            }):''}</ul>
           
        </form>
    )
}
export default Register