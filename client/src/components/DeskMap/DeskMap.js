import {useState, useContext, useEffect} from "react";
import {Header} from "../Navigation/Header";
import {Board} from "./Board";
import styles from './css/map.module.css'
import { SocketContext } from "../../contexts/socketContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";




export function DeskMap(){
const [listLength, setListLength] = useState(2)  // the amount of desks per list
const [newDeskValues, setNewDeskValues] = useState({
        name : '',
        symbol : ''
})
const [showNewDeskForm, setShowNewDeskForm] = useState(false)
const socket = useContext(SocketContext)
const {getFromStorage} = useLocalStorage()
const [desks, setDesks] = useState([])
const [confModalData, setConfModalData] = useState({
    show : false,
    action: '',
    deskId : ''
})

console.log(desks)

useEffect(() => {
  socket.emit('getDesks', (getFromStorage('id')))
}, [])

useEffect(() => {
    socket.on('receiveDesks', (desks) => {
        setDesks([...desks])
    })
}, [socket])

const onShowNewDeskForm = () => showNewDeskForm ? setShowNewDeskForm(false) : setShowNewDeskForm(true)

const onDeskValChange = (e) => {
    setNewDeskValues((oldValues) => {
        return {
            ...oldValues,
            [e.target.name] : e.target.value
        }
    })
}


const onNewDeskSubmit = (e) => {
    e.preventDefault()
    socket.emit('newDeskRegister', ([newDeskValues, getFromStorage('id')]))
    setNewDeskValues({name : '', symbol: ''})
    setShowNewDeskForm(false)
}

useEffect(() => {
    socket.on('newDeskAdded', (newDesk) => {
        setDesks(desks => [...desks, newDesk])
    })
}, [socket])

return (
<>
 <Header />
    <div className="wrapper">
        <div className={styles.subheader}>
            <ul>
                <li>
                    <p>Create New Desk</p>
                    {showNewDeskForm 
                      ? <svg onClick={() => onShowNewDeskForm()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                      : <svg onClick={() => onShowNewDeskForm()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                    }
                   { showNewDeskForm &&  
                   <form className={styles['symbol-form']} onSubmit={(e) => onNewDeskSubmit(e)}>
                        <fieldset>
                            <label htmlFor="desk-name">Desk name:</label>
                            <input 
                                type="text" 
                                className={styles["desk-name"]} 
                                id="desk-name"
                                name="name" 
                                value={newDeskValues.name} 
                                onChange={(e) => onDeskValChange(e)}
                             />
                        </fieldset>
                        <fieldset>
                        <label htmlFor="desk-symbol">Symbol URL:</label>
                            <input 
                                className={styles['symbol-input-link']} 
                                type="text" 
                                id="desk-symbol" 
                                name="symbol" 
                                value={newDeskValues.symbol} 
                                onChange={(e) => onDeskValChange(e)}
                            />
                        </fieldset>
                        <button>Create</button>
                    </form>}
                </li>
                <li>
                    <p>View other people's desks</p>
                </li>
            </ul>
        </div>
        <Board desks={desks} listLength={listLength}/>
    </div>
</>
    )
}