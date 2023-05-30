import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import New from './pages/New'
import Show from './pages/Show'
import Edit from './pages/Edit'
// import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" style={{  }}>
      <Header />
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path=":id/" element={<Show />} />
        <Route path="/:id/edit" element={<Edit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
