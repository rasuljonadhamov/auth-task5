// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [auth, setAuth] = useState(false);
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000")
//       .then((res) => {
//         console.log(res);
//         if (res.data.Status == "Success") {
//           setName(res.data.name);
//           setAuth(true);
//         } else {
//           setAuth(false);
//           setMessage(res.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleDelete = () => {
//     axios
//       .get("http://localhost:8000/logout")
//       .then((res) => {
//         console.log(res);
//         location.reload(true);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="container mt-4">
//       {auth ? (
//         <div>
//           <h3>You are Authorized {name} </h3>
//           <button onClick={handleDelete} className="btn btn-danger">
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h3>{message}</h3>
//           <h3>login now</h3>
//           <Link to={"/register"} className="btn btn-danger">
//             Register
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          setName(res.data.name);
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/logout")
      .then((res) => {
        console.log(res);
        navigate("/register");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>You are Authorized {name}</h3>
          <Link to="/admin" className="btn btn-primary mr-2">
            Admin Panel
          </Link>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login now</h3>
          <Link to="/register" className="btn btn-danger mr-2">
            Register
          </Link>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
