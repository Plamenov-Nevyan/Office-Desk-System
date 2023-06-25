import {Navigate, Outlet} from "react-router-dom"
import { useLocalStorage } from "../../../hooks/useLocalStorage"

export const PrivateRoute = () => {
  const {storedData} = useLocalStorage()

  if(!storedData.session){
    return <Navigate  to={"/"} replace/>
  }
  else {
    return <Outlet />
  }
}