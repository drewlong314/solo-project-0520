import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import { updateNotebooks, deleteNotebook } from "../../store/notebooks";
import LoginFormModal from "../LoginFormModal";
import styles from "./DropDown.module.css";
import LoginForm from "../LoginFormModal/LoginForm";
import RenameNotebookModal from "../RenameNotebookModal";

function DropDown({ notebook }) {
  const [showMenu, setShowMenu] = useState(false);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const renameRef = useRef(null);
  const buttonRef = useRef(null);

  const showMenuFunc = () => {
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    // console.log(menuRef.current, "////////////////////////////////////");
    // if (!menuRef.current.contains(e.target)) {
    //   setShowMenu(false);
    //   document.removeEventListener("click", closeMenu);
    // }
  };

  useEffect(() => {
    // if (showMenu) {
    //   document.addEventListener("click", closeMenu);
    // }
    //   : document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    console.log(renameRef.current);
    console.log(menuRef.current);
  }, [menuRef.current, renameRef.current]);

  return (
    <div>
      <button onClick={(e) => showMenuFunc()}>...</button>
      {showMenu ? (
        <div ref={menuRef} id={"menu"} className={styles.menuItem}>
          <button className={styles.exit} onClick={() => setShowMenu(false)}>X</button>
          <button
            onClick={() => dispatch(createNote(sessionUser.id, notebook.id))}
          >
            Add new note
          </button>

          <RenameNotebookModal
            ref={renameRef}
            notebook={notebook}
            closeMenu={closeMenu}
          />
          {/* <LoginFormModal/> */}
          <button onClick={() => dispatch(deleteNotebook(notebook.id))}> Delete notebook </button>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
