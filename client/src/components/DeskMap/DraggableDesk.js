import {ListItem} from "./ListItem";
import { Droppable } from "react-beautiful-dnd"
import styles from './css/board.module.css'

export function DraggableDesk({list, prefix, isOwnedDesks}){
    if(isOwnedDesks){
        return (
        <Droppable droppableId={`${prefix}`} >  
        {(provided, snapshot) => (  
            <div  
                className={styles['droppable-container']}
                {...provided.droppableProps}  
                ref={provided.innerRef}  
            >  
                {list.map((desk, index) => (  
                    <ListItem key={desk._id} desk={desk} index={index}  isOwnedDesks={isOwnedDesks}/>
                ))}  
                {provided.placeholder}
            </div>  
                
        )}  
    </Droppable>  
    )
  }else {
    return (
        <div className={styles['droppable-container']}>
             {list.map((desk, index) => (
                <ListItem key={desk._id} desk={desk} index={index} isOwnedDesks={isOwnedDesks} />
             ))}
        </div>
    )
  }
}