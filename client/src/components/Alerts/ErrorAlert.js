import styles from "./css/alerts.module.css";
import { useSocketErrorHandler } from "../../hooks/useSocketErrorHandler";

export const ErrorAlert = (errors) => {
  // Receive errors from the custom hook for central error handling  and extract their messages to be rendered
  let errorMessages = Object.values(errors)[0].messages;
  const { removeErrors } = useSocketErrorHandler();

  return (
    <div className={styles.alert + " " + styles.error}>
      <input onFocus={() => removeErrors()} type="checkbox" id="alert1" />
      <label className={styles.close} title="close" htmlFor="alert1">
        <i className="icon-remove" />
      </label>
      {Object.values(errors).length > 0 &&
        errorMessages.map((message) => (
          <p className={styles.inner}>
            <strong>Error!</strong> {message}!
          </p>
        ))}
    </div>
  );
};
