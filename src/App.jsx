
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "./components/LoginPage/login";
import Register from "./components/RegisterPage/register";
import Home from "./components/Home/home";
import Header from "./components/Header/header";
import Books from "./components/Books/books.jsx";
import ProtectedRoute from './ProtectedRoute'
import NotFound from './PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/books" element={<Books />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App