import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [from, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  console.log(from);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/register", from)
      .then((res) => {
        console.log(res);
        if (res.data.Status == "Success") {
          navigate("/login");
        } else {
          alert("Error during login ");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded-sm w-25">
        <h2>Sign Up</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              onChange={(e) => setForm({ ...from, name: e.target.value })}
              type="text"
              name="name"
              placeholder="Enter Your Name..."
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              onChange={(e) => setForm({ ...from, email: e.target.value })}
              type="email"
              name="email"
              placeholder="Enter Your email..."
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              onChange={(e) => setForm({ ...from, password: e.target.value })}
              type="password"
              name="password"
              placeholder="Enter Your password..."
              className="form-control rounded-0"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>

          <p>You are agree to our terms and polices </p>

          <Link
            to={"/login"}
            className="btn btn-default border  bg-light text-decoration-none w-100"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
