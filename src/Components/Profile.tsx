import './styles/Profile.css'
import { useState,useEffect } from 'react'
import UserProfile from './types/UserProfileType'
import UserInfo from './interfaces/UserInfoInterface'
import backgroundLGYM from './img/backgroundLGYMApp500.png'
import Junior1 from './img/newRanks/Junior1.png'



const Profile:React.FC=()=>{
    const [yourProfile,setYourProfile]=useState<UserProfile>({name:localStorage.getItem('username')!,email:localStorage.getItem('email')!})
    const [profileRank,setProfileRank]=useState<string>('')
    const logout:VoidFunction=():void=>{
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('rank')
        localStorage.removeItem('dl')
        localStorage.removeItem('sq')
        localStorage.removeItem('bp')
        localStorage.removeItem('plan')
        window.location.href='/'
    }
    const checkUserRank=async():Promise<void>=>{
        const response: "Didnt find" | UserInfo = await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo/${localStorage.getItem("id")}`).then(res=>res.json()).then(res=>res)
        if(response !== "Didnt find")
             if(response.profileRank){
                setProfileRank(response.profileRank)
             } 
             
     }
    useEffect(()=>{
        checkUserRank()
        setTimeout(()=>document.querySelector('#profileContainer')?.classList.remove('hidden'),100)
    },[])

    return(
        <section className='hidden profileContainerDisplay' id='profileContainer'>
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            <h1>Your profile</h1>
            <h2>Name: {yourProfile.name}</h2>
            <h3>Email: {yourProfile.email}</h3>
            <h3>Profile Rank: {profileRank}</h3>
            
            <img src={Junior1} id='profileRank' alt="" />
           
            
            <button onClick={logout} id='logout'>Logout</button>
        </section>
    )
}

export default Profile