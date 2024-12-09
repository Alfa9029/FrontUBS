import React from 'react';


function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-teal-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="https://www.portaldeextrema.com.br/wp-content/uploads/2023/07/posto-saude-ubs.jpg" alt="Logo" className="h-12 w-12" />
        <span className="text-white ml-2">MAPSAÚDE</span>
      </div>
      <nav className="flex space-x-4">
        <a href="#" className="text-white">Notícias</a>
        <a href="#" className="text-white">Encontre sua UBS</a>
        <a href="#" className="text-white">Campanha</a>
        <a href="#" className="text-white">PlataformaUBS</a>
      </nav>
    </header>
  );
}

export default Header;
