import React, { useEffect, useState } from "react";
import { instance } from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../context/AuthContext";

import ClockLoader from "react-spinners/ClockLoader";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    UserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await instance.post("/api/v1/auth/login", {
        name,
        password,
      });
      setIsAuthenticated(true);
      setLoading(false);
      toast.success(data.msg);

      console.log(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await instance.post("/api/v1/auth/logout");
      console.log(data, isAuthenticated);
      toast.success("Logged Out");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated]);

  //   console.log(isAuthenticated);
  return (
    <div>
      {loading ? (
        <div className="h-screen w-full bg-green-500 flex items-center justify-center ">
          <ClockLoader />
        </div>
      ) : (
        <div className=" h-[700px]  flex justify-center items-center">
          <form
            className="w-[60%] bg-[#ffffff] flex flex-col justify-center items-center h-[65%] rounded-xl border-2  border-black"
            onSubmit={handleLogin}
          >
            <h1 className="text-center text-2xl my-4">Login</h1>
            <input
              className="block my-5 px-5 py-2 rounded-xl w-[80%] border-none outline-none outline-6 outline-black"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="name"
            />
            <input
              className="block my-5 px-5 py-2 rounded-xl w-[80%] border-none outline-none outline-6 outline-black"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            <button className="bg-[#0d99ff] w-[80%] py-2 my-2 rounded-xl hover:bg-[#0964a4] duration-150 ease-in">
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <Link className="text-[#0d99ff]" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
