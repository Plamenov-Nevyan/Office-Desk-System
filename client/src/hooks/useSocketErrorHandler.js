import { useState } from "react";
import { ErrorAlert } from "../components/Alerts/ErrorAlert";

export function useSocketErrorHandler() {
  const [errors, setErrors] = useState({});

  const onError = (errorsReceived) => {
    removeErrors()
    setErrors(() => {
      return { ...errorsReceived };
    });
  }

  const removeErrors = () => setErrors(() => {});

  return {
    SocketErrorHandler: ({ children }) => (
      <>
        {Object.values(errors).length > 0 && <ErrorAlert error={errors} />}
        {children}
      </>
    ),
    onError,
    removeErrors,
  };
}
