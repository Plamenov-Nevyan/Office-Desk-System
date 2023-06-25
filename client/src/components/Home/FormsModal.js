import { LoginForm } from "./Forms/LoginForm";
import { RegisterForm } from "./Forms/RegisterForm";
import styles from "./css/modal.module.css";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/socketContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export function FormsModal({ closeModal, form, errorHandler }) {
  const { setToStorage } = useLocalStorage();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // According to which form we have opened, different event are being emited
  const onSubmitHandler = (e, userData) => {
    e.preventDefault();
    form === "register"
      ? socket.emit("userSignUp", userData)
      : socket.emit("userLogin", userData);
  };

  useEffect(() => {
    // on successful register or login set the received session in storage and navigate to the desk map
    socket.on("userRegistered", (session) => {
      setToStorage(session);
      closeModal();
      navigate("/map");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("userLoggedIn", (session) => {
      setToStorage(session);
      closeModal();
      navigate("/map");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("error", (errors) => {
      errorHandler(errors);
    });
  }, [socket]);

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <span className={styles.close} onClick={() => closeModal()}>
          &times;
        </span>
        {form === "register" ? (
          <RegisterForm onSubmitHandler={onSubmitHandler} />
        ) : (
          <LoginForm onSubmitHandler={onSubmitHandler} />
        )}
      </div>
    </div>
  );
}
