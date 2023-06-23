import styles from "./css/alerts.module.css"


export const ErrorAlert = (errors) => {
let errorMessages = Object.values(errors)[0].messages
console.log(errorMessages)
    return (
    <div className={styles.alert + " " + styles.error}>
        <input type="checkbox" id="alert1" />
        <label className={styles.close} title="close" htmlFor="alert1">
            <i className="icon-remove" />
        </label>
            {Object.values(errors).length > 0 && errorMessages.map((message) => <p className={styles.inner}>
                    <strong>Error!</strong> {message}!
                </p>)
         }
    </div>
    )
}