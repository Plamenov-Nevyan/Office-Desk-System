import {useState} from "react";


export function useLocalStorage(){
  const [storedData, setStoredData] = useState(() => JSON.parse(localStorage.getItem('session') || '{}'))

 const setToStorage = (data) => {
   localStorage.setItem("session", JSON.stringify({...data}))
   setStoredData({...data})
 }

 const replaceInStorage = (key, newData) => {
  localStorage.setItem("session", JSON.stringify({...storedData, [key] : newData}))
   setStoredData((oldData) => {return {...oldData, [key] : newData}})
 }

 const deleteSession = () => {
   localStorage.removeItem('session')
   setStoredData({})
 }

 const getFromStorage = (key) => storedData[key]

 const getAllFromStorage = () => storedData

 return {
    setToStorage,
    getFromStorage,
    deleteSession,
    getAllFromStorage,
    replaceInStorage,
    storedData
 }

}