import {ListItem} from "./ListItem";
import { Droppable } from "react-beautiful-dnd"
import styles from './css/board.module.css'

export function DraggableDesk({list, prefix}){
    return (
        <Droppable droppableId={`${prefix}`} >  
        {(provided, snapshot) => (  
            <div  
                className={styles['droppable-container']}
                {...provided.droppableProps}  
                ref={provided.innerRef}  
            >  
                {list.map((desk, index) => (  
                    <ListItem key={desk.id} desk={desk} index={index} />
                ))}  
                {provided.placeholder}
            </div>  
        )}  
    </Droppable>  
    )
}