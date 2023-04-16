import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import { UserContext } from "./context/AuthContext";
import { instance } from "./utils/axios";
import { useEffect } from "react";
import Quotes from "./pages/Quotes";

function App() {
  const { setUser, setIsAuthenticated } = UserContext();

  const getUserInfo = async () => {
    try {
      const { data } = await instance("/api/v1/auth/me");
      setUser(data.userData.name);
      setIsAuthenticated(true);
      // console.log(data.userData.name);
    } catch (error) {
      setUser("");
      setIsAuthenticated(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

//https://mern-todo-backend-w1eq.onrender.com
