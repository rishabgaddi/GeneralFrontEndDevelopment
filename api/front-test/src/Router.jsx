import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./layout/default";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
