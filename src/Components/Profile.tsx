import './styles/Profile.css'
import { useState } from 'react'



const Profile:React.FC=()=>{
    const [yourProfile,setYourProfile]=useState({name:'Name',email:'Email',createdAt:'25.10.2023',rank:'GIGACHAD'})
    return(
        <section id='profileContainer'>
            <h1>Your profile</h1>
            <h2>Name: {yourProfile.name}</h2>
            <h3>Email: {yourProfile.email}</h3>
            <h3>Member since: {yourProfile.createdAt}</h3>
            <h3>Rank: {yourProfile.rank}</h3>
            <button id='logout'>Logout</button>
        </section>
    )
}

export default Profile