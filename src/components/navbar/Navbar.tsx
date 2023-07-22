import axios from "axios";
import "./navbar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("https://csarta.onrender.com/api/auth/logout");
      localStorage.setItem("currentUser", null!);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Aledmin</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user" onClick={() => setOpenModal(!openModal)}>
          <img
            src={currentUser?.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            className="user"
            alt=""
          />
          <span>{currentUser?.username}</span>
        </div>
        {openModal && (
          <div className="menuAvatar">
            <div className="buttonLogout">
              <button onClick={handleLogout}>
                {!currentUser ? "Iniciar sesión" : "Cerrar Sesión"}
              </button>
            </div>
          </div>
        )}
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
