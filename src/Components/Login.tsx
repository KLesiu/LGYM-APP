import './styles/Login.css'
import {useState} from 'react'
import uniqid from "uniqid"
import ErrorMsg from './types/ErrorType'
import logo from './img/logoLGYM.png'
import LoadingPreloadForms from './LoadingPreloadForms'

const Login:React.FC=()=>{
    const [errors,setErrors]:[ErrorMsg[], React.Dispatch<React.SetStateAction<ErrorMsg[]>>]= useState<ErrorMsg[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const login=async(event:React.FormEvent<HTMLFormElement>):Promise<string | void>=>{
        event.preventDefault()
        setLoading(true)
        const name:string|undefined = document.querySelector<HTMLInputElement>("input[name='username']")?.value
        const password:string|undefined = document.querySelector<HTMLInputElement>("input[name='password']")?.value
        if(!name || !password) {
            setErrors([])
            setTimeout(()=>setLoading(false),1000)
            setTimeout(()=>setErrors([{msg:"All fields are required!"}]),1000) 
            return
        } 
        const response:'Authorized'|'Unauthorized' = await fetch(`${process.env.REACT_APP_BACKEND}/api/login`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password
            })
        }).then(res=>{
            if(res.statusText=== "Unauthorized"){
                setErrors([])
                setTimeout(()=>setLoading(false),1000)
                setTimeout(()=>setErrors([{msg:'We havent heard about you yet!  Please register'},{
                    msg: "Maybe you typed wrong password! Please check it"
                }]),1000)

            } 
            else{
                
                return res.json()
            }
        }).then(data=>{
            if(!data) return 'Unauthorized'
            const token:string = data.token
            localStorage.setItem('username',data.req.name)
            localStorage.setItem('id',data.req._id)
            localStorage.setItem("token",token)
            localStorage.setItem('email',data.req.email)
            return 'Authorized'
            
        }).catch(err=>err)
        
        if(response==`${process.env.REACT_APP_MSG_LOGIN_AUTH}`){
            setErrors([])
            setTimeout(()=>setLoading(false),1000)
            setTimeout(()=>window.location.href ='/home',1000)
            return
        } 
    }
    return(
        <form id='login' onSubmit={login}>
            <img className='logoOfAPP' src={logo} alt="" />
            <label htmlFor="username">Username</label>
            <input type="text" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
            <button>LOGIN</button>
            {loading?<LoadingPreloadForms/>:''}
            <a href='/register'>You dont have acc? Lets create it for FREE</a>
            <ul>{errors?errors.map((ele:ErrorMsg)=>{
                return <li key={uniqid()}>{ele.msg}</li>
            }):''}</ul>
        </form>
    )
}
export default Login