import styles from './css/navbar.module.css'



export function Navbar({showModal}){

    return(
    <nav className={styles["main-nav"]}>
        <ul className={styles["main-nav-links"]}>
            <li><a>FAQ</a></li>        
            <li><a>Contacts</a></li>  
            <li><a onClick={(e) => showModal(e, 'login')}>Login</a></li>  
            <li><a onClick={(e) => showModal(e, 'register')}>Sign Up</a></li>  
        </ul>
    </nav>
    )
}