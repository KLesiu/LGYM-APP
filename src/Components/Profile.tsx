import './styles/Profile.css'
import { useState,useEffect } from 'react'



const Profile:React.FC=()=>{
    const [yourProfile,setYourProfile]=useState({name:localStorage.getItem('username'),email:localStorage.getItem('email')})
    const [rank,setRank]= useState('')
    const logout:VoidFunction=()=>{
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        window.location.href='/'
    }
    const checkUserRank=async()=>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo/${localStorage.getItem("id")}`).then(res=>res.json()).then(res=>res)
        if(response !== "Didnt find"){
           setRank(response.rank)
        }
    }
    useEffect(()=>{
        checkUserRank()
    },[])

    return(
        <section id='profileContainer'>
            <h1>Your profile</h1>
            <h2>Name: {yourProfile.name}</h2>
            <h3>Email: {yourProfile.email}</h3>
            <h3>Rank: {rank}</h3>
            <button onClick={logout} id='logout'>Logout</button>
        </section>
    )
}

export default Profile