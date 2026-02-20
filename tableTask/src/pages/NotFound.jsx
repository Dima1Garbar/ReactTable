import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notFound">
      <h1 className="notFound-title">404</h1>
      <h2 className="notFound-underTitle">Page Not Found</h2>
      <Link 
        className="btn btn-primary notFound-button"
        to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;
