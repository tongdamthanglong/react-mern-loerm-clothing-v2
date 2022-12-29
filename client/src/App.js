import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Menu from "./components/nav/Menu";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Menu />
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
