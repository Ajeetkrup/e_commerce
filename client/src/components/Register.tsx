import React, { useState } from "react";
import { registerUser } from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, email, password, name});
      setMessage(data.message || "Registration successful!");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(
          (error as Error & { response?: { data?: { error?: string } } })
            .response?.data?.error ?? "Registration failed."
        );
      } else {
        setMessage("Registration failed.");
      }
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-[400px] min-h-[600px] bg-white shadow-lg rounded-lg p-8 flex flex-col justify-center space-y-6 mx-auto my-8">
        <h1 className="font-title text-3xl text-center text-purple-600">
          Sign Up
        </h1>

        {message && <div className="text-center text-red-500">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
            <label htmlFor="name" className="text-indigo-600">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-indigo-600">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Username"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-indigo-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-indigo-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-indigo-600 flex items-center">
              <input type="checkbox" className="mr-2 rounded-md" />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-full py-2 font-bold hover:bg-purple-700 transition-colors duration-3"
          >
            Create Account
          </button>
        </form>

        <div className="relative">
          <hr className="border-indigo-300 my-4" />
          <span className="absolute bg-white px-2 text-indigo-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            OR
          </span>
        </div>

        <button className="flex items-center justify-center w-full bg-white border border-indigo-300 rounded-md py-2 font-bold">
          <img
            src="https://icons8.com/vue-static/landings/brands/brands/google.svg"
            alt="Google"
            className="h-6 w-6 mr-2"
          />
          Sign up with Google
        </button>

        <div className="text-center space-y-2 mt-2">
          <p className="text-indigo-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-purple hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
