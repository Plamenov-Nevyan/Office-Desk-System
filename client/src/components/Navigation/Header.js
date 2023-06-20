import {Navbar} from "./Navbar";
import styles from './css/header.module.css'
import logo from './images/logo.png'


export function Header({showModal}) {


    return (
        <header className={styles.header}>
            <div className={styles["logo-container"]}>
                <img className={styles.logo} src={logo} alt="app-logo-image" />
            </div>
            <div className={styles["logo-down-layer"]}>
                <h1>Moveify</h1>
            </div>
            <Navbar showModal = {showModal}/>
        </header>
    )
}