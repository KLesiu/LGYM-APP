import './styles/Menu.css'
interface MenuProps{
    viewChange:(view:any)=>any
}

const Menu=({viewChange}:MenuProps)=>{
    return(
        <nav>
            <div>
            <span className=" iconNav material-symbols-outlined">
            note
            </span>
                <button>Training plan</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            calendar_month
            </span>
                <button>Calendar</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            add_box
            </span>
                <button>Add training</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            trophy
            </span>
                <button>Records</button>
            </div>
            <div>
            <span className="iconNav material-symbols-outlined">
            account_circle
            </span>
                <button>Profile</button>
            </div>
            
            
        </nav>
    )
}
export default Menu