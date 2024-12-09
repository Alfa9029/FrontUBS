import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function ListaProf() {
  const [profissionais, setProfissionais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await api.get('/ubs');
        setProfissionais(response.data);
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
      }
    };

    fetchProfissionais();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 relative">
      <h2 className="text-2xl font-semibold mb-6">Lista de Profissionais</h2>
      {profissionais.length > 0 ? (
        <ul>
          {profissionais.map((profissional) => (
            <li key={profissional.id}>{profissional.nome}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum profissional encontrado.</p>
      )}
      <button
        onClick={() => navigate('/dashboard')}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
      >
        Voltar ao Dashboard
      </button>
    </div>
  );
}

export default ListaProf;
