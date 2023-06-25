import { useState, useContext, useEffect } from "react";
import { Header } from "../Navigation/Header";
import { Board } from "./Board";
import styles from "./css/map.module.css";
import { SocketContext } from "../../contexts/socketContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function DeskMap({ onError }) {
  const [listLength, setListLength] = useState(2); // the amount of desks per list settable by select input on the page
  const [newDeskValues, setNewDeskValues] = useState({  // controlled inputs for create form
    name: "",  
    symbol: "",
  });
  const [showNewDeskForm, setShowNewDeskForm] = useState(false); 
  const socket = useContext(SocketContext);
  const { getFromStorage } = useLocalStorage();
  const [desks, setDesks] = useState([]);  // desks which we receive through the socket event
  const [showUserSelect, setShowUserSelect] = useState(false); // show or hide the div showing list of all registered users
  const [selectedUser, setSelectedUser] = useState({}); //the data of the user for who we want to see created desks
  const [users, setUsers] = useState("");

  let isOwnedDesks = Object.values(selectedUser).length > 0 ? false : true; //determine if user is selected or not to pass to children

  useEffect(() => {
    // Error handling through the custom hook for central error state
    socket.on("error", (errors) => {
      errorHandler(errors);
    });
  },[socket]);

  useEffect(() => {
    // on component mount, get existing desks
    socket.emit("getDesks", getFromStorage("id"));
  }, []);

  useEffect(() => {
    // set received desks from backend
    socket.on("receiveDesks", (desks) => {
      setDesks([...desks]);
    });
  }, [socket]);

  useEffect(() => {
    // Receive newly created desk and add it to state
    socket.on("newDeskAdded", (newDesk) => {
      setDesks((desks) => [...desks, newDesk]);
    });
  }, [socket]);

  useEffect(() => {
    //Receive registered users for selection and save the to state
    socket.on("receiveUsers", (users) => {
      setUsers({ ...users });
      setShowUserSelect(true);
    });
  }, [socket]);

  const errorHandler = (errors) => onError(errors);

  const onShowNewDeskForm = () =>
    showNewDeskForm ? setShowNewDeskForm(false) : setShowNewDeskForm(true);

  const onDeskValChange = (e) => {
    setNewDeskValues((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onNewDeskSubmit = (e) => {
    // emit event for creating new desk and empty + close create form
    e.preventDefault();
    socket.emit("newDeskRegister", [newDeskValues, getFromStorage("id")]);
    setNewDeskValues({ name: "", symbol: "" });
    setShowNewDeskForm(false);
  };

  const onShowUserSelect = () => {
    // get registered users for selection  when user wants to see someone else's desks
    if (showUserSelect) {
      setShowUserSelect(false);
    } else {
      socket.emit("getUsers");
    }
  };

  const onUserSelect = (userToSelect) => {
    // set selected user state when clicking on their username and close the div showing users for selection
    setSelectedUser(userToSelect);
    onShowUserSelect();
  };

  const backToOwnDesk = () => {
    // empty user selection and get back owned desks
    setSelectedUser((selected) => {
      return {};
    });
    socket.emit("getDesks", getFromStorage("id"));
  };

  const onListLengthChange = (e) => setListLength(() => Number(e.target.value)); //set desired list length to pass to children

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className={styles.subheader}>
          <ul>
            {Object.values(selectedUser).length > 0 ? (
              <li>
                <button
                  onClick={() => backToOwnDesk()}
                  className={styles["back-to-owned-btn"]}
                >
                  Back to my desk
                </button>
              </li>
            ) : (
              <li>
                <p>Create New Desk</p>
                {showNewDeskForm ? (
                  <svg
                    onClick={() => onShowNewDeskForm()}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => onShowNewDeskForm()}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                )}
                {showNewDeskForm && (
                  <form
                    className={styles["symbol-form"]}
                    onSubmit={(e) => onNewDeskSubmit(e)}
                  >
                    <fieldset>
                      <label htmlFor="desk-name">Desk name:</label>
                      <input
                        type="text"
                        className={styles["desk-name"]}
                        id="desk-name"
                        name="name"
                        value={newDeskValues.name}
                        onChange={(e) => onDeskValChange(e)}
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="desk-symbol">Symbol URL:</label>
                      <input
                        className={styles["symbol-input-link"]}
                        type="text"
                        id="desk-symbol"
                        name="symbol"
                        value={newDeskValues.symbol}
                        onChange={(e) => onDeskValChange(e)}
                      />
                    </fieldset>
                    <button>Create</button>
                  </form>
                )}
              </li>
            )}
            <li>
              <p>View other people's desks</p>
              {showUserSelect ? (
                <svg
                  onClick={() => onShowUserSelect()}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              ) : (
                <svg
                  onClick={() => onShowUserSelect()}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              )}
              {showUserSelect && (
                <div className={styles["users-list-container"]}>
                  <ul className={styles["users-list"]}>
                    {Object.values(users).length > 0 ? (
                      Object.values(users).map((user) => (
                        <li onClick={() => onUserSelect(user)}>
                          {user.username}
                        </li>
                      ))
                    ) : (
                      <h3>You are the first user, congratulations !</h3>
                    )}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <label htmlFor="select-list-length">Desks per list:</label>
              <select
                id="select-list-length"
                className={styles["list-lgth-select"]}
                name="select-list-length"
                value={listLength}
                onChange={(e) => onListLengthChange(e)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </li>
          </ul>
        </div>
        {Object.values(selectedUser).length > 0 && (
          <h3 className={styles["username-header"]}>
            {selectedUser.username}'s Desk
          </h3>
        )}
        <Board
          desks={
            Object.values(selectedUser).length > 0 ? selectedUser.desks : desks
          }
          listLength={listLength}
          isOwnedDesks={isOwnedDesks}
        />
      </div>
    </>
  );
}
