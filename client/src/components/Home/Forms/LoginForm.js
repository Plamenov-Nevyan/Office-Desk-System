import styles from '../css/forms.module.css'
import { useState } from 'react'

export function LoginForm({onSubmitHandler}){
  const [formValues, setFormValues] = useState({
    email : '',
    password : ''
  })

  const onFormValChange = (e) => setFormValues((oldValues) => {return {...oldValues, [e.target.name] : e.target.value}})
    return (
        <form className={styles.form} onSubmit={(e) => {onSubmitHandler(e, formValues)}}>
            <fieldset className={styles["auth-fieldset"]}>    
                <label htmlFor="email">Email:</label>
                <input 
                type="text" 
                id="email" 
                name="email" 
                placeholder="Your email" 
                value={formValues.email}
                onChange={(e) => onFormValChange(e)}
                />
            </fieldset>
            <fieldset className={styles["auth-fieldset"]}>
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="Your password" 
                value={formValues.password}
                onChange={(e) => onFormValChange(e)}
                />
            </fieldset>
            <button>Login</button>
        </form>
    )
}