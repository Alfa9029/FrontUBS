// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import ListaProf from "./components/ListaProf";
import Calendario from "./components/Calendario";
import ListaUBS from "./components/ListaUBS";
import CreateProfessional from "./components/CreateProfessional";
import CreateCampaign from "./components/CreateCampaign";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={isAuthenticated} />
        <main className="flex-grow bg-white w-full">
          <Routes>
            <Route path="/" element={<ListaUBS />} />
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/listar"
              element={isAuthenticated ? <ListaProf /> : <Navigate to="/login" />}
            />
            <Route
              path="/calendario"
              element={isAuthenticated ? <Calendario /> : <Navigate to="/login" />}
            />
            <Route
              path="/createCampaign"
              element={isAuthenticated ? <CreateCampaign /> : <Navigate to="/login" />}
            />
            <Route
              path="/createProfessional"
              element={isAuthenticated ? <CreateProfessional /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
