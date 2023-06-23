import homeImg from './home-pic.jpg'
import {Header} from '../Navigation/Header'
import styles from './css/home.module.css'
import { useState } from 'react'
import {FormsModal} from './FormsModal'


export function Home({onError}){
   const [modalData, setModalData] = useState({
    show: false,
    form: ''
   })

   const showModal = (e,form) => {   
    e.preventDefault()
    setModalData(oldData => {return {show : true, 'form' : form}})
   }

   const errorHandler = (errors) => {
    closeModal()
    onError(errors)
}


   const closeModal = () =>  setModalData(oldData => {return {show : false, form : ''}})

    return (
        <>
        {modalData.show && <FormsModal closeModal={closeModal} form={modalData.form} errorHandler={errorHandler}/>}
        < Header showModal={showModal}/>
        <section className={styles["home-banner"]}>
            <article className= {styles["home-banner-left"]}> 
                <h4>Office Desk Mapping System</h4>
                <h1>Interactivity and reliability at your disposal !</h1>
            </article>
            <article className= {styles["home-banner-right"]}>
                    <img src={homeImg} alt='Home-banner-picture' />
            </article>
        </section>
        </>
    )
}