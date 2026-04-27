import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import Task from "../pages/Task";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Tasks/:id/:name" element={<Task />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
