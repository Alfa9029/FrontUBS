// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ListaProf from "./components/ListaProf";
import Agenda from './components/Agenda';
import Calendario from "./components/Calendario";
import ListaUBS from "./components/ListaUBS";
import CreateProfessional from "./components/CreateProfessional"; // Importar o novo componente
import CreateCampaign from "./components/CreateCampaign.JS"; // Certifique-se de que a capitalização está correta

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-white w-full">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/listar" element={<ListaProf />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/ubs" element={<ListaUBS />} />
            <Route path="/createCampaign" element={<CreateCampaign />} /> {/* Nova rota */}
            <Route path="/createProfessional" element={<CreateProfessional />} /> {/* Nova rota */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
