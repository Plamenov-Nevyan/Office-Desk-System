import {useState, useReducer} from "react";
import {Header} from "../Navigation/Header";
import {Board} from "./Board";
let desks = [
    {id : 'zxcadsdds'},
    {id : 'zxcdsds'},
    {id : 'uyiyuk'},
    {id : 'tujyukyu'},
  ]



export function DeskMap(){
const [listLength, setListLength] = useState(2)  // the amount of desks per list
return (
<>
 <Header />
    <div className="wrapper">
        <aside>
            <ul>
                <li>Create New Desk</li>
                <li>View other people's desks</li>
            </ul>
        </aside>
        <Board desks={desks} listLength={listLength}/>
    </div>
</>
    )
}