import './Register.css';
import { Link, useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import ErrorContainer from '../Error/ErrorContainer';
import { useError } from '../../contexts/ErrorContext';

export default function Register() {
  const navigate = useNavigate();
  const { onRegister } = useContext(AuthContext);
  const { addError } = useError(); 

  const registerSubmitHandler = async (values) => {
    const { email, password, repeatPassword } = values;

    if (!email || !password) {
      return addError('Email and password are required!');
    }

    if (password !== repeatPassword) {
      return addError('Password mismatch!');
    }

    try {
      await onRegister({email, password,repeatPassword});
      navigate('/');
    } catch (err) {
      addError(err.message);
    }
  };

  const { values, changeHandler, onSubmit } = useForm(
    { email: '', password: '', repeatPassword: '' },
    registerSubmitHandler,
    { resetOnSubmit: true }
  );

  return (
    <section className="register-page section py-3 d-flex align-items-center min-height-80vh">
      <div className="container">
        <div className="row justify-content-center w-100">
          <form id="register" className="col-md-6 col-lg-5" onSubmit={onSubmit}>
            <h1 className="h1 text-center mb-5">Register</h1>

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
              <label htmlFor="pass" className="fw-semibold label-font">Password:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="password"
                name="password"
                value={values.password}
                onChange={changeHandler}
              />
            </div>

            <div className="form-group mb-4 text-center">
              <label htmlFor="con-pass" className="fw-semibold label-font">Confirm Password:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="password"
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={changeHandler}
              />
            </div>

            <button
              className="btn btn-success btn-lg px-5 d-block mx-auto btn-custom"
              type="submit"
            >
              Register
            </button>

            <div className="mt-3 text-center">
              <span>
                If you already have a profile{" "}
                <Link to="/login" className="text-success fw-semibold">
                  sign-in here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}