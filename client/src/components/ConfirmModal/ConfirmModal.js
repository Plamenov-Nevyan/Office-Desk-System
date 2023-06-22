import styles from './css/confirmModal.module.css'
import { SocketContext } from '../../contexts/socketContext';
import { useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export function ConfirmModal({action, deskId, onClose, editValues}){
    const socket = useContext(SocketContext)
    const {getFromStorage} = useLocalStorage()
    console.log(editValues)
    const onDelete = () => {
        socket.emit('deleteDesk', ([deskId, getFromStorage('id')]))
        onClose()
    }

    const onEdit = () => {
        socket.emit('editDesk', [deskId, getFromStorage('id'), editValues])
    }

    return(
        <div className={styles["conf-modal"]}>
        <div className={styles['conf-modal-content']}>
        <span className={styles.close} onClick={() => onClose()}>&times;</span>
                <h5>{
                    action === 'delete'
                    ? 'Are you sure you want to delete this desk ?'
                    :  'Are you sure you want to edit this desk ?'
                }</h5>
                {action === 'delete'
                    ? <button onClick={() => onDelete()}>Yes</button>
                    : <button onClick={() => onEdit()}>Yes</button>
                }
 
                <button onClick={() => onClose()}>Cancel</button>
        </div>
    </div>
    )
}