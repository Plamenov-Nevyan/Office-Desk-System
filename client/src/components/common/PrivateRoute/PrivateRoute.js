import {Navigate, Outlet} from "react-router-dom"
import { useLocalStorage } from "../../../hooks/useLocalStorage"

export const PrivateRoute = () => {
  const {storedData} = useLocalStorage()

  if(Object.values(storedData).length <= 0){
    return <Navigate  to={"/"} replace/>
  }
  else {
    return <Outlet />
  }
}