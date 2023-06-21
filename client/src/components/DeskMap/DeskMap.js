import {useState, useReducer} from "react";
import {Header} from "../Navigation/Header";
import {Board} from "./Board";
import styles from './css/map.module.css'

let desks = [
    {id : 'zxcadsdds'},
    {id : 'zxcdsds'},
    {id : 'uyiyuk'},
    {id : 'tujyukyu'},
  ]



export function DeskMap(){
const [listLength, setListLength] = useState(2)  // the amount of desks per list
const [newDeskValues, setNewDeskValues] = useState({
        name : '',
        file: true,
        link: false,
        symbol : undefined
})
const [showNewDeskForm, setShowNewDeskForm] = useState(false)

const onShowNewDeskForm = () => showNewDeskForm ? setShowNewDeskForm(false) : setShowNewDeskForm(true)

const onDeskValChange = (e) => {
    console.log(e.target)
    e.preventDefault()
    if(e.target.type === 'radio') {
        e.target.id === 'file' 
        ? setNewDeskValues((oldValues) => {return{...oldValues, 'file':true, link:false}})
        : setNewDeskValues((oldValues) => {return{...oldValues, 'file':false, link:true}})
    }else {
    let newValues = {
        ...newDeskValues,
       [ e.target.name] :   e.target.type === 'radio' ? e.target.value : e.target.value
    }
    setNewDeskValues({...newValues})
    }
}

console.log(newDeskValues)

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
                   <form className={styles['symbol-form']}>
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
                            <label>Upload file or paste link?</label>
                            <input 
                                className={styles['symbol-checkbox']} 
                                type='radio' 
                                name = 'symbol'
                                id="file" 
                                value={newDeskValues.file}
                                onChange={(e) => onDeskValChange(e)}
                             />
                            <input
                                className={styles['symbol-checkbox']} 
                                type='radio' 
                                name = 'symbol' 
                                id="link" 
                                value={newDeskValues.link}
                                onChange={(e) => onDeskValChange(e)}
                              />
                        </fieldset>
                        <fieldset>
                            { newDeskValues.file === true
                                ? <>
                                    <label htmlFor="desk-symbol">Upload File:</label>
                                    <input 
                                        className={styles['symbol-input-file']} 
                                        type="file" 
                                        id="desk-symbol" 
                                        name="symbol" 
                                        onChange={(e) => onDeskValChange(e)}
                                    />
                                  </>
                                : <>
                                    <label htmlFor="desk-symbol">Paste URL:</label>
                                    <input 
                                        className={styles['symbol-input-link']} 
                                        type="text" 
                                        id="desk-symbol" 
                                        name="symbol" 
                                        value={newDeskValues.symbol} 
                                        onChange={(e) => onDeskValChange(e)}
                                    />
                                 </>
                            }
                        </fieldset>
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