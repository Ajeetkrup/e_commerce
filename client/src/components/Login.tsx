import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../apis/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      setMessage("Login successful!");
      navigate("/profile");
    } catch (error: unknown) {
      console.error("Error during login:", error);
      if (error instanceof Error) {
        setMessage(
          (error as Error & { response?: { data?: { message?: string } } })
            .response?.data?.message ?? "Login failed."
        );
      } else {
        setMessage("Login failed.");
      }
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-[400px] min-h-[500px] bg-white shadow rounded-lg flex flex-col p-6 gap-6 mx-auto my-8">
        <h1 className="font-title text-3xl text-center text-purple-600">
          Sign In
        </h1>

        {message && <div className="text-center text-red-600">{message}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-indigo-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-indigo-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-indigo-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-full py-2 font-bold hover:bg-purple-700 transition-colors duration-3"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-indigo-600">or</div>

        <button className="flex items-center justify-center w-full bg-white border border-indigo-300 rounded-md py-2 font-bold">
          <i className="fa-brands fa-google"></i> Sign in with Google
        </button>

        <div className="text-center text-indigo-600">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-purple hover:underline">
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
