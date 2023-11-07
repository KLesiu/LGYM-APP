import './styles/Login.css'
import {useState} from 'react'
import uniqid from "uniqid"
import ErrorMsg from './types/ErrorType'

const Login:React.FC=()=>{
    const [errors,setErrors]:any= useState<ErrorMsg[]>([])
    const login:any=async(event:Event)=>{
        event.preventDefault()
        const name:string|undefined = document.querySelector<HTMLInputElement>("input[name='username']")?.value
        const password:string|undefined = document.querySelector<HTMLInputElement>("input[name='password']")?.value
        if(!name || !password) return setErrors([{msg:"All fields are required!"}])
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/login`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password
            })
        }).then(res=>{
            if(res.statusText=== "Unauthorized") return setErrors([{msg:'We havent heard about you yet!  Please register'},{
                msg: "Maybe you typed wrong password! Please check it"
            }])
            else{
                setErrors([])
                 return res.json()
            }
        }).then(data=>{
            const token = data.token
            localStorage.setItem('username',data.req.name)
            localStorage.setItem('id',data.req._id)
            localStorage.setItem("token",token)
            localStorage.setItem('email',data.req.email)
            return 'Authorized'
            
        }).catch(err=>err)
        if(response==`${process.env.REACT_APP_MSG_LOGIN_AUTH}`) return window.location.href ='/home'
    }
    return(
        <form id='login' onSubmit={login}>
            <h1>LOG IN TO LGYM APP</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
            <button>LOGIN</button>
            <a href='/register'>You dont have acc? Lets create it for FREE</a>
            <ul>{errors?errors.map((ele:ErrorMsg)=>{
                return <li key={uniqid()}>{ele.msg}</li>
            }):''}</ul>
        </form>
    )
}
export default Login