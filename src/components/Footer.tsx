import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <Link className="footer-logo" to="/">
            MediaHub
          </Link>
          <p>Find a little inspiration for every screen.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <small>MediaHub</small>
        <small>Built for visual discovery</small>
      </div>
    </footer>
  );
};

export default Footer;
