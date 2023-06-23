import { useState } from "react";
import {ErrorAlert} from "../components/Alerts/ErrorAlert";

export function useSocketErrorHandler(){
    const [errors, setError] = useState({})

    const onError = (errors) => setError(() =>{ return {...errors}})

    return {
        SocketErrorHandler : ({children}) => <>
        {Object.values(errors).length > 0 && <ErrorAlert error={errors} />}
        {children}
        </>,
        onError
    }
}