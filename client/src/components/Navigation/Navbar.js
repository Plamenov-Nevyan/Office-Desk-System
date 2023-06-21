import {NavLink} from 'react-router-dom'
import styles from './css/navbar.module.css'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'


export function Navbar({showModal}){
    const {storedData, deleteSession} = useLocalStorage()
    const navigate = useNavigate()
    
    const onLogout = (e) => {
        e.preventDefault()
        deleteSession()
        navigate('/')
    }

    return(
    <nav className={styles["main-nav"]}>
        <ul className={styles["main-nav-links"]}>
            <li>
                <NavLink 
                    className={isActive => isActive.isActive ? styles.active : styles.inactive} 
                    to='/faq'
                    >
                        FAQ
                </NavLink>
            </li>        
            <li>
                <NavLink 
                    to='/contacts'
                    className={isActive => isActive.isActive ? styles.active : styles.inactive} 
                    >
                        Contacts
                </NavLink>
            </li>  
            {storedData.email
             ? <>
                <li><a onClick={(e) => onLogout(e)} className={styles.inactive}>Logout</a></li>  
             </>
             : <>
                <li><a onClick={(e) => showModal(e, 'login')} className={styles.inactive} >Login</a></li>  
                <li><a onClick={(e) => showModal(e, 'register')} className={styles.inactive} >Sign Up</a></li>  
             </>
            }


        </ul>
    </nav>
    )
}