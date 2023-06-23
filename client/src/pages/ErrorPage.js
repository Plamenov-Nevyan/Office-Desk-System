import oopsImg from "./images/oops.jpg";
import styles from "./css/errorPage.module.css";

export default function ErrorPage() {
  return (
    <div>
      <img className={styles["error-img"]} src={oopsImg} alt="Oops image" />
    </div>
  );
}
