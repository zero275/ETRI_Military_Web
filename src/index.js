import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
