import './styles/Profile.css'
import { useState } from 'react'



const Profile:React.FC=()=>{
    const [yourProfile,setYourProfile]=useState({name:localStorage.getItem('username'),email:localStorage.getItem('email'),rank:localStorage.getItem('rank')})
    const logout:VoidFunction=()=>{
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('rank')
        window.location.href='/'
    }
    return(
        <section id='profileContainer'>
            <h1>Your profile</h1>
            <h2>Name: {yourProfile.name}</h2>
            <h3>Email: {yourProfile.email}</h3>
            <h3>Rank: {yourProfile.rank}</h3>
            <button onClick={logout} id='logout'>Logout</button>
        </section>
    )
}

export default Profile