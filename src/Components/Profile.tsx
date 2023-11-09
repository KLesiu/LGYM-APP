import './styles/Profile.css'
import { useState,useEffect } from 'react'
import UserProfile from './types/UserProfileType'
import UserInfo from './interfaces/UserInfoInterface'
import backgroundLGYM from './img/backgroundLGYMApp500.png'
import ProfileRank from './ProfileRank'




const Profile:React.FC=()=>{
    const [yourProfile,setYourProfile]=useState<UserProfile>({name:localStorage.getItem('username')!,email:localStorage.getItem('email')!})
    const [profileRank,setProfileRank]=useState<string>('')
    const [memberSince,setMemberSince]=useState<string>('')
    const [rankComponent,setRankComponent]=useState<JSX.Element>()
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
    const checkMoreUserInfo=async():Promise<void>=>{
        const response: "Didnt find" | UserInfo = await fetch(`${process.env.REACT_APP_BACKEND}/api/userInfo/${localStorage.getItem("id")}`).then(res=>res.json()).then(res=>res)
        if(response !== "Didnt find")
             if(response.profileRank && response.createdAt){
                setProfileRank(response.profileRank)
                setMemberSince(response.createdAt.slice(0,10))
                
             } 
             
             
     }
    useEffect(()=>{
        checkMoreUserInfo()
        setRankComponent(<ProfileRank />)
        setTimeout(()=>document.querySelector('#profileContainer')?.classList.remove('hidden'),100)
    },[])
    

    return(
        <section className='hidden profileContainerDisplay' id='profileContainer'>
            <img className='backgroundLGYM' src={backgroundLGYM} alt="" />
            <h1>Your profile</h1>
            <div className='containerForInfoProfile'>
            <h2>Name: {yourProfile.name}</h2>
                <div className='ColumnProfile'>
                    
                    <h3 className='profileRankh3'>Profile Rank :  {profileRank}
                    {rankComponent} 
                    </h3>
                    <h3>Email: {yourProfile.email}</h3>
                    <h3>Member Since: {memberSince}</h3>
                    
                </div>
           
                
                
            </div>
            
            
            
            <button onClick={logout} id='logout'>Logout</button>
        </section>
    )
}

export default Profile