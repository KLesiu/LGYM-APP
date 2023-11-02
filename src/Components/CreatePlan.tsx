

interface CreatePlanProps{
    formElements: JSX.Element
}
const CreatePlan:React.FC<CreatePlanProps> = (props)=>{
    
    return(
        <section>
            {props.formElements}
        </section>
    )
}
export default CreatePlan