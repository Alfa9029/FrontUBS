// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Calendario from "./components/Calendario";
import ListaUBS from "./components/ListaUBS";
import CreateProfessional from "./components/CreateProfessional";
import CreateCampaign from "./components/CreateCampaign";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User found:", user); // Debugging log
    setIsAuthenticated(!!user);

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      console.log("Updated User:", updatedUser); // Debugging log
      setIsAuthenticated(!!updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
              path="/calendario"
              element={
                isAuthenticated 
                  ? <Calendario /> 
                  : (() => { console.log("Redirecting to /login"); return <Navigate to="/login" /> })()
              }
            />
            <Route
              path="/createCampaign"
              element={
                isAuthenticated 
                  ? <CreateCampaign /> 
                  : (() => { console.log("Redirecting to /login"); return <Navigate to="/login" /> })()
              }
            />
            <Route
              path="/createProfessional"
              element={
                isAuthenticated 
                  ? <CreateProfessional /> 
                  : (() => { console.log("Redirecting to /login"); return <Navigate to="/login" /> })()
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
