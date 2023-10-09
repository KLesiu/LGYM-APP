import './styles/Register.css'
const Register:React.FC=()=>{
    
    return(
        <form id="register">
            <h1>REGISTER TO LGYM APP</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"  />
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  />
            <label htmlFor="rpassword">Repeat password</label>
            <input type="password" name="rpassword"  />
            <button type='submit'>REGISTER</button>
           
        </form>
    )
}
export default Register