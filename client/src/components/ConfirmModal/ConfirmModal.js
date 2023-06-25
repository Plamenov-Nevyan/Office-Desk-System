import styles from "./css/confirmModal.module.css";
import { SocketContext } from "../../contexts/socketContext";
import { useContext, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useSocketErrorHandler } from "../../hooks/useSocketErrorHandler";

export function ConfirmModal({ action, deskId, onClose, editValues }) {
  const socket = useContext(SocketContext);
  const { getFromStorage } = useLocalStorage();
  const { onError } = useSocketErrorHandler();

  // Confirm desk delete, and emit socket event
  const onDelete = () => {
    socket.emit("deleteDesk", [deskId, getFromStorage("id")]);
    onClose();
  };

  
  // Confirm desk edit, and emit socket event
  const onEdit = () => {
    socket.emit("editDesk", [deskId, getFromStorage("id"), editValues]);
  };

  
  // Update central error state to be transffered and rendered in ErrorAlert component
  useEffect("error", (errors) => {
    onError(errors);
  }, [socket]);

  return (
    <div className={styles["conf-modal"]}>
      <div className={styles["conf-modal-content"]}>
        <span className={styles.close} onClick={() => onClose()}>
          &times;
        </span>
        <h5>
          {action === "delete"
            ? "Are you sure you want to delete this desk ?"
            : "Are you sure you want to edit this desk ?"}
        </h5>
        {action === "delete" ? (
          <button onClick={() => onDelete()}>Yes</button>
        ) : (
          <button onClick={() => onEdit()}>Yes</button>
        )}

        <button onClick={() => onClose()}>Cancel</button>
      </div>
    </div>
  );
}
