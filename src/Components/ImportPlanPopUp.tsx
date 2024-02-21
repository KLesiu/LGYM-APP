import './styles/ImportPlanPopUp.css'
import ImportPlanPopUpProps from './props/ImportPlanPopUpProps'
const ImportPlanPopUp:React.FC<ImportPlanPopUpProps>=(props)=>{
    const importPlan=():void=>{
        props.setImportPlan()
    }
    return(
        <section className='importPopUp'>
            <p>If you want to copy someone plan you need to have a userId!</p>
            <input id="importPlanInput" placeholder='userId' type="text" />
            <button onClick={importPlan}>COPY!</button>
        </section>
    )
}
export default ImportPlanPopUp