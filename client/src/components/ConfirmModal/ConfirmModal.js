import styles from './css/confirmModal.module.css'
import { SocketContext } from '../../contexts/socketContext';
import { useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export function ConfirmModal({action, deskId, onClose}){
    const socket = useContext(SocketContext)
    const {getFromStorage} = useLocalStorage()

    const onDelete = () => {
        socket.emit('deleteDesk', ([deskId, getFromStorage('id')]))
        onClose()
    }

    return(
        <div className={styles["conf-modal"]}>
        <div className={styles['conf-modal-content']}>
        <span className={styles.close} onClick={() => onClose()}>&times;</span>
                <h5>{
                    action === 'delete'
                    ? 'Are you sure you want to delete this desk ?'
                    :  'Are you sure you want to modify this desk ?'
                }</h5>
                <button onClick={() => onDelete()}>Yes</button>
                <button onClick={() => onClose()}>Cancel</button>
        </div>
    </div>
    )
}