import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./css/board.module.css";
import { useEffect, useState } from "react";
import { DraggableDesk } from "./DraggableDesk";
let listsMain = ["1", "2", "3"];

export function Board({ desks, listLength, isOwnedDesks }) {
  const [lists, setLists] = useState({});

  useEffect(() => {
    setLists({ ...generateLists() }); // setting new lists state in the form of an object with lists as properties and decks as nested objects
  }, [desks, listLength]);

  const generateLists = () => {
    let desksCopy = desks.slice(0);
    let createdLists = {};
    for (let i = 0; i < desksCopy.length; i += listLength) {
      const chunk = desksCopy.slice(i, i + listLength);
      createdLists[`list-${i + 1}`] = chunk;
    }
    return createdLists;
  };

  const removeFromLists = (list, index) => {
    // removing the desk  we want to move from it's parent list
    const listToArr = Array.from(list);
    const [deskToMove] = listToArr.splice(index, 1);
    return [deskToMove, listToArr];
  };

  const addToList = (list, index, desk) => {
    // adding the desk to the list we want it move to
    const listToArr = Array.from(list);
    listToArr.splice(index, 0, desk);
    return listToArr;
  };

  const onDragEnd = (result) => {
    // react-beautiful-dnd function that serves as event listener when dropping a draggable desk
    if (!result.destination) {
      return;
    } // with result being an event object, that allows us to manipulate the lists order
    let newListOrder = { ...lists }; // ---> making a deep copy of the lists state for manipulation
    let sourceList = newListOrder[result.source.droppableId]; // ---> retrieving the list from which we move the desk
    const [deskToMove, movingToList] = removeFromLists(
      sourceList,
      result.source.index
    );
    newListOrder[result.source.droppableId] = movingToList;
    let destinationList = newListOrder[result.destination.droppableId]; // --> retrieving the list to which we want to move the desk
    newListOrder[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      deskToMove
    );
    setLists({ ...newListOrder });
  };

  if (isOwnedDesks) {
    return (
      <div className={styles["drag-drop-context-container"]}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(lists).length > 0 ? (
            <div
              className={styles["list-grid"]}
              style={{
                gridTemplateColumns: `repeat(${
                  Object.values(lists).length
                }, 1fr)`,
              }}
            >
              {Object.entries(lists).map(([key, value]) => (
                <DraggableDesk
                  key={key}
                  list={lists[key]}
                  prefix={key}
                  isOwnedDesks={isOwnedDesks}
                />
              ))}
            </div>
          ) : (
            <h1>No desk lists created yet...</h1>
          )}
        </DragDropContext>
      </div>
    );
  } else {
    return (
      <div className={styles["drag-drop-context-container"]}>
        {Object.values(lists).length > 0 ? (
          <div
            className={styles["list-grid"]}
            style={{
              gridTemplateColumns: `repeat(${
                Object.values(lists).length
              }, 1fr)`,
            }}
          >
            {Object.entries(lists).map(([key, value]) => (
              <DraggableDesk
                key={key}
                list={lists[key]}
                prefix={key}
                isOwnedDesks={isOwnedDesks}
              />
            ))}
          </div>
        ) : (
          <h1>This user doesn't have any desk lists created yet...</h1>
        )}
      </div>
    );
  }
}
