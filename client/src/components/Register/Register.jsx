
import { Link } from "react-router";

export default function Register() {
    
  return (
    <section className="section py-3 d-flex align-items-center min-height-80vh">
      <div className="container">
        <div className="row justify-content-center w-100">
          <form id="register" className="col-md-6 col-lg-5" >
            <h1 className="h1 text-center mb-5">Register</h1>

            <div className="form-group mb-4 text-center">
              <label htmlFor="email" className="fw-semibold label-font">Email:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="email"
                
              />
            </div>

            <div className="form-group mb-4 text-center">
              <label htmlFor="pass" className="fw-semibold label-font">Password:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="password"
                
              />
            </div>

            <div className="form-group mb-4 text-center">
              <label htmlFor="con-pass" className="fw-semibold label-font">Confirm Password:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="password"
                
              />
            </div>

            <button
              className="btn btn-success btn-lg px-5 d-block mx-auto btn-custom"
              type="submit"
            >
              Register
            </button>

            <div className="mt-3 text-center">
              <span>If you already have profile <Link to="/login" className="text-success fw-semibold">sign-in here</Link></span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
