import styles from './css/listItem.module.css'

export function ListItem({num}){

    return (
        <div className={styles.desk}>
            <p>{num}</p>
        </div>
    )
}