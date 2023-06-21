import styles from '../css/forms.module.css'
import { useState } from 'react'
import { submitUserData } from '../../../services/authServices'

export function RegisterForm(){
  const [formValues, setFormValues] = useState({
    username : '',
    email : '',
    password : ''
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await submitUserData(formValues)
  }

  const onFormValChange = (e) => setFormValues((oldValues) => {return {...oldValues, [e.target.name] : e.target.value}})
    return (
        <form className={styles.form} onSubmit={(e) => onSubmitHandler(e)}>
            <fieldset className={styles["auth-fieldset"]}>    
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Your username" 
                value={formValues.username} 
                onChange={(e) => onFormValChange(e)}
                />
            </fieldset>
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
            <button>Register</button>
        </form>
    )
}