import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
      e.preventDefault()
    try {
      await axios.post("/register", {
          name,
          email,
          password,
        })
        alert('Registration Successful. Now you can log in')
    } catch (err) {
      alert("Registration failed. Please try again later")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-xl mx-auto" onSubmit={registerUser}>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={name && email && password && '/login'}>
            <button onClick={name && email && password && (() => alert('Registration successful'))} className="primary">Register</button>          
          </Link>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
