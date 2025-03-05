import { useState } from "react";
import css from "../CSS/Error.module.css";

const RegisterSuccess = ({ error, handleBtn }) => {
  const [isError, setError] = useState(false);

  return (
    <div className={css.errorContainer}>
      <div className={css.error}>
        <p className="fs-3">{error}</p>
        <button className="btn btn-danger" onClick={handleBtn}>Ok</button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
