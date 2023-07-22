import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://csarta.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      // setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="cardlogin">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar sesión</h1>
          <label htmlFor="">Nombre de Admin</label>

          <input
            name="email"
            type="email"
            className="input"
            placeholder="ej. nombre@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="●●●●●●●●"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Iniciar Sesión
          </button>
          {err && err}
        </form>
      </div>
    </div>
  );
};

export default Login;
