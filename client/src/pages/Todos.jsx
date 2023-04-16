import React, { useState } from "react";
import { instance } from "../utils/axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/AuthContext";
import ClockLoader from "react-spinners/ClockLoader";
import DisplayTodos from "../components/DisplayTodos";
import { BsChatSquareQuoteFill, BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const Todos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, setLoading, user } = UserContext();

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await instance.post("/api/v1/todos/newTodo", {
        title,
        description,
      });
      console.log(data.msg);
      toast.success(data.msg);
      setTitle("");
      setDescription("");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error.message);
    }
  };
  console.log(user);
  return (
    <div>
      {loading ? (
        <div className="h-screen w-full  flex items-center justify-center ">
          <ClockLoader />
        </div>
      ) : (
        <div>
          <form
            className=" bg-[#ffffff] flex flex-col justify-center items-center h-[65%] rounded-xl "
            onSubmit={handleCreateTodo}
          >
            <h1 className="text-center text-2xl my-4">
              Welcome Back {user && user}
            </h1>
            <input
              className="block my-5 px-5 py-2  w-[80%] border-black border-2 outline-none "
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="title"
            />
            <input
              className="block my-5 px-5 py-2  w-[80%] border-black border-2 outline-none "
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="description"
            />
            <div className="flex justify-between items-center gap-8">
              <button className="text-3xl">
                <BsPlusSquare />
              </button>
              <Link className="my-2 text-3xl" to="/quotes">
                <BsChatSquareQuoteFill />
              </Link>
            </div>
          </form>
          <DisplayTodos />
        </div>
      )}
    </div>
  );
};

export default Todos;
