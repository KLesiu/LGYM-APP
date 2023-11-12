import './styles/CreatePlan.css'
import CreatePlanProps from './props/CreatePlanPropsInterface'


const CreateConfigPlan:React.FC<CreatePlanProps> = (props)=>{
    return(
        <form id="createPlan" onSubmit={props.setDayAndName} action="">
            <h2>PLAN CONFIG</h2>
            <label htmlFor="name">Plan name:</label>
            <input type="text" name="name" />
            <label htmlFor="days">How many days per week do you want to train?</label>
            <input type='number' list="days" max={7} min={1} name="days" />
            <datalist id="days">
                <option value={1}></option>
                <option value={2}></option>
                <option value={3}></option>
                <option value={4}></option>
                <option value={5}></option>
                <option value={6}></option>
                <option value={7}></option>

            </datalist>
            <button id='nextCreatePlanButton'>NEXT</button>
        </form>
    )
}
export default CreateConfigPlan