import { Link } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { useError } from "../../contexts/ErrorContext";   
import ErrorContainer from '../Error/ErrorContainer';
import './Login.css';

export default function Login() {
    const {onLogin} = useContext(AuthContext);
    const { addError } = useError(); 
    const { values, changeHandler, onSubmit } = useForm(
    { email: '', password: '' },
    async (formValues) => {
      const { email, password } = formValues;

      if (!email || !password) {
        addError("Email and password are required!"); 
        return;
      }

      try {
        await onLogin(formValues);
      } catch (err) {
        addError(err.message); 
      }
    }
  );

    return (
    <section className="login-page section py-2 d-flex align-items-center min-height-80vh">
      <div className="container">
        <div className="row justify-content-center w-100">
          <form id="login" className="col-md-6 col-lg-5" onSubmit={onSubmit}>
            <h1 className="h1 text-center mb-5">Login</h1>

             <ErrorContainer />
             
            <div className="form-group mb-4 text-center">
              <label htmlFor="email" className="fw-semibold label-font">Email:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="email"
                name="email"
                value={values.email}
                onChange={changeHandler}
              />
            </div>

            <div className="form-group mb-4 text-center">
              <label htmlFor="password" className="fw-semibold label-font">Password:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="password"
                name="password" 
                value={values.password}
                onChange={changeHandler}
              />
            </div>

            <button
              className="btn btn-success btn-lg px-5 d-block mx-auto btn-custom"
              type="submit"
            >
              Login
            </button>

            <div className="mt-3 text-center">
              <span>Don't have an account? <Link to="/register" className="text-success fw-semibold">Register here</Link></span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
