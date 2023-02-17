import React from "react";
import Login from "./pages/login/index";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Auth/index";
import Read from "./pages/Dashbord/Read";
import Edit from "./pages/Form/Edit";
import Create from "./pages/Form/Create";
import Footerr from "./pages/Footer/Footer";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Read />}></Route>
        <Route exact path="/create" element={<Create />}></Route>
        <Route exact path="/edit" element={<Edit />}></Route>
        <Route exact path="/" element={<Footerr />}></Route>
      </Route>
    </Routes>
    </>
  );
};

export default App;
