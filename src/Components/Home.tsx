import './styles/Home.css'
import Menu from './Menu'
import TrainingPlan from './TrainingPlan'
import {  useState,useEffect } from 'react'
import LoadingSection from './LoadingSection'
import Loading from './Loading'
import logo from './img/logo300.png'


const Home:React.FC=()=>{
    const [view,setView]=useState<JSX.Element>(<TrainingPlan/>)
    const [sectionLoading,setSectionLoading]=useState<boolean>(true)
    const [mainSectionLoading,setMainSectionLoading]=useState<boolean>(true)
    const [componentLoaded,setComponentLoaded]=useState<boolean>(false)
    const offLoading:VoidFunction=():void=>setComponentLoaded(true)
    const changeView=(view:JSX.Element):void=>{
        setTimeout(()=>setSectionLoading(false),1100)
        setView(view)
    }
    useEffect(()=>{
        if(!sectionLoading) setSectionLoading(true)
    },[view])
    useEffect(()=>{
        setTimeout(()=>setSectionLoading(false),1100)
    },[])
    return(
        <main>
            <span id='holderForLogo'><img className='logoOfHome' src={logo} alt="" /></span>
            {sectionLoading?<LoadingSection/>:''}
            {view}
            {componentLoaded?'':<Loading offLoading={offLoading} />}
            
            <Menu viewChange={changeView}  />
        </main>
    )
}
export default Home