import React, { useEffect, useState } from "react";
import { instance } from "../utils/axios";
import { toast } from "react-hot-toast";

const DisplayTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const getTodos = async () => {
    try {
      const { data } = await instance("/api/v1/todos/getTodos");
      // console.log(data.tasks);
      setTodos(data.tasks);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const { data } = await instance.put(`/api/v1/todos/${id}`);
      setIsChecked(!isChecked);

      toast.success(data.msg);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/api/v1/todos/${id}`);
      toast.success("deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }

    getTodos();
  };

  return (
    <div>
      {todos.map((todo) => {
        const { title, description, _id } = todo;
        return (
          <div
            key={_id}
            className=" my-4 flex justify-between w-[80%] border-black border-2 items-center py-4 px-4 ml-[10%]"
          >
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <h1>{description}</h1>
            </div>
            <div>
              <input
                className="w-[50px] h-[20px] cursor-pointer"
                type="checkbox"
                checked={isChecked}
                onChange={() => handleUpdate(_id)}
              ></input>
              <button
                className="bg-red-400 mx-4 py-3 px-2 "
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayTodos;
