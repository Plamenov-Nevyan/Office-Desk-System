import styles from './css/listItem.module.css'
import { Draggable } from "react-beautiful-dnd";

export function ListItem({desk, index}){

    return (
        <Draggable key={desk.id} draggableId={desk.id} index={index}> 
        {(provided, snapshot) => (  
            <div  
                ref={provided.innerRef}  
                {...provided.draggableProps}  
                {...provided.dragHandleProps}  
            >  
                <div className={styles.desk}>
                    <p>{desk.id}</p>
                </div>
            </div>  
        )}  
    </Draggable>  
    )
}