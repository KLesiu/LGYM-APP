import CreatePlanProps from "./interfaces/CreatePlanPropsInterface"
const CreatePlan:React.FC<CreatePlanProps> = (props)=>
    <section>
        {props.formElements}
    </section>
  

export default CreatePlan