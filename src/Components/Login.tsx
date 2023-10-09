import './styles/Login.css'
const Login:React.FC=()=>{
    return(
        <form id='login'>
            <h1>LOG IN TO LGYM APP</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" />
            <button>LOGIN</button>
            <a href='/register'>You dont have acc? Lets create it for FREE</a>
        </form>
    )
}
export default Login