import React, { useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../context/AuthContext";
import ClockLoader from "react-spinners/ClockLoader";
import { Link } from "react-router-dom";
const Quotes = () => {
  const [quote, setQuote] = useState({});
  const { loading, setLoading } = UserContext();

  const getQuotes = async () => {
    setLoading(true);
    try {
      const quote = await axios.get(
        "https://api.themotivate365.com/stoic-quote"
      );
      setQuote(quote.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-screen w-full  flex items-center justify-center ">
          <ClockLoader />
        </div>
      ) : (
        <div className=" p-10 h-screen flex justify-center items-center flex-col">
          <div className="border-2 border-black rounded-lg w-full h-full flex justify-center items-center flex-col p-4">
            <h1 className="font-bold text-2xl">"{quote.quote}"</h1>
            <p className="ml-[60%] text-xl">- {quote.author}</p>
          </div>

          <button
            className="my-6 bg-[#0d99ff] w-[40%] py-2  rounded-xl hover:bg-[#0964a4] duration-150 ease-in"
            onClick={getQuotes}
          >
            Next Quote
          </button>
          <Link
            to="/todos"
            className="bg-[#0d99ff] w-[40%] py-2 text-center  rounded-xl hover:bg-[#0964a4] duration-150 ease-in"
          >
            Back To Todos
          </Link>
        </div>
      )}
    </div>
  );
};

export default Quotes;
