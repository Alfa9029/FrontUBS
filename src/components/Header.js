import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(isAuthenticated ? path : '/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-teal-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://www.portaldeextrema.com.br/wp-content/uploads/2023/07/posto-saude-ubs.jpg"
          alt="Logo"
          className="h-12 w-12"
        />
        <span className="text-white ml-2">MAPSAÚDE</span>
      </div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-white">Home</Link>
        <button onClick={() => handleNavigation('/calendario')} className="text-white">
          Calendário
        </button>
        <button onClick={() => handleNavigation('/createCampaign')} className="text-white">
          Criar Campanha
        </button>
        <button onClick={() => handleNavigation('/createProfessional')} className="text-white">
          Cadastrar Profissional
        </button>
      </nav>
    </header>
  );
}

export default Header;
