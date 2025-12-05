
import { Link } from "react-router";


export default function Login() {
    
    return (
    <section className="section py-2 d-flex align-items-center min-height-80vh">
      <div className="container">
        <div className="row justify-content-center w-100">
          <form id="login" className="col-md-6 col-lg-5" >
            <h1 className="h1 text-center mb-5">Login</h1>

            <div className="form-group mb-4 text-center">
              <label htmlFor="email" className="fw-semibold label-font">Email:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="email"
                name="email"
                
              />
            </div>

            <div className="form-group mb-4 text-center">
              <label htmlFor="password" className="fw-semibold label-font">Password:</label>
              <input
                className="form-control mt-2 mx-auto input-center"
                type="password"
                name="password" 
                
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
