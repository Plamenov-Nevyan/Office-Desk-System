import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {ListItem} from './ListItem'
import styles from './css/board.module.css'
import {useState} from 'react'

export function Board({desks}){
  const [desksOrder, setDesksOrder] = useState(desks)

  const onDragEnd = (result) => {
    if(!result.destination){return}
    console.log(result)
        let newDeskOrder = [...desksOrder]
        let [deskToMove] = newDeskOrder.splice(result.source.index, 1)
        newDeskOrder.splice(result.destination.index, 0, deskToMove)
        setDesksOrder(newDeskOrder)
  }
  console.log(desksOrder)
return (
    <DragDropContext onDragEnd={onDragEnd}>  
        <Droppable droppableId="droppable" >  
            {(provided, snapshot) => (  
                <div  
                    className={styles['droppable-container']}
                    {...provided.droppableProps}  
                    ref={provided.innerRef}  
                >  
                    {desksOrder.map((desk, index) => (  
                        <Draggable key={desk.id} draggableId={desk.id} index={index}>  
                            {(provided, snapshot) => (  
                                <div  
                                    ref={provided.innerRef}  
                                    {...provided.draggableProps}  
                                    {...provided.dragHandleProps}  
                                >  
                                <ListItem num={desk.id} />
                                </div>  
                            )}  
                        </Draggable>  
                    ))}  
                    {provided.placeholder}
                </div>  
            )}  
        </Droppable>  
    </DragDropContext>
    )
}