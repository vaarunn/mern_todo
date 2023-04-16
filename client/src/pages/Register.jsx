import React, { useEffect, useState } from "react";
import { instance } from "../utils/axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    UserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await instance.post("/api/v1/auth/register", {
        name,
        password,
      });

      if (data.msg === "User already exists") {
        toast.error("User already exists");
        return;
      }
      // console.log(data.msg);

      setLoading(false);
      setIsAuthenticated(true);
      toast.success(data.msg);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="h-screen w-full  flex items-center justify-center ">
          <ClockLoader />
        </div>
      ) : (
        <div className=" h-[700px]  flex justify-center items-center">
          <form
            className="w-[60%] bg-[#ffffff] flex flex-col justify-center items-center h-[65%] rounded-xl border-2  border-black"
            onSubmit={handleRegister}
          >
            <h1 className="text-center text-2xl my-4">Register</h1>
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
            <button className="bg-[#0d99ff] hover:bg-[#0964a4] duration-150 ease-in w-[80%] py-2 my-2 rounded-xl">
              Register
            </button>
            <p>
              Already an user?{" "}
              <Link className="text-[#0d99ff]" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
