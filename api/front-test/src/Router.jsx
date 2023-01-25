import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Default from "./layout/default";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { Todos } from "./pages/Todos";
import TodosRTK from "./pages/TodosRTK";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Default privated>
              <Home />
            </Default>
          }
        />
        <Route
          path="/animals"
          element={
            <Default privated>
              <Animals />
            </Default>
          }
        />
        <Route
          path="/contact"
          element={
            <Default privated>
              <Contact />
            </Default>
          }
        />
        <Route
          path="/register"
          element={
            <Default>
              <Register />
            </Default>
          }
        />
        <Route
          path="/login"
          element={
            <Default>
              <Login />
            </Default>
          }
        />
        <Route
          path="/logout"
          element={
            <Default>
              <Logout />
            </Default>
          }
        />
        <Route
          path="/todos"
          element={
            <Default privated={true}>
              <Todos />
            </Default>
          }
        />
        <Route
          path="/todos-rtk"
          element={
            <Default privated={true}>
              <TodosRTK />
            </Default>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
