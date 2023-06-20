import {LoginForm} from './Forms/LoginForm'
import {RegisterForm} from './Forms/RegisterForm'
import styles from './css/modal.module.css'


export function FormsModal({closeModal, form}){
    

    return (
        <div className={styles.modal}>
            <div className={styles['modal-content']}>
            <span className={styles.close} onClick={() => closeModal()}>&times;</span>
            {form === 'register'
                ? <RegisterForm />
                : <LoginForm />
            }
            </div>
        </div>
    )
}