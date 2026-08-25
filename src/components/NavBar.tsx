import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function NavBar() {
  const { user, logout, updatedImage } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <div className="logo">
          <h1>MediaHub</h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        {!user ? (
          <div className="login">
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        )}

        <div className="profile">
          {user ? (
            <Link to="/profile">
              <div className="pic-to-profile">
                <img src={updatedImage} alt="" />
              </div>
            </Link>
          ) : (
            <p>Guest</p>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
