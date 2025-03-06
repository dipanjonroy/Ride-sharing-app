import { Link } from "react-router-dom";
import "../CSS/Error.css"

function Error() {
  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h2 className="fw-bold error-heading text-dark">404 <br/>page not found</h2>
        <Link to={"/"} className="error-button bg-dark px-5 py-2 rounded">Return Home</Link>
      </div>
    </div>
  );
}

export default Error;
