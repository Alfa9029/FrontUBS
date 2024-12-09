import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../axiosConfig';

function Agenda() {
  // Estados para armazenar os valores do formulário
  const [titulo, setTitulo] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [especializacao, setEspecializacao] = useState('');
  const [horario, setHorario] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para salvar os dados no Local Storage
  const handleSave = async (e) => {
    e.preventDefault();

    const newCampanha = {
      titulo,
      local,
      data,
      nome,
      especializacao,
      horario,
      descricao,
    };

    try {
      const response = await api.post('/api/ubs/:id/campanhas', newCampanha); // Substitua :id pelo ID correto da UBS
      if (response.status === 201) {
        alert('Campanha registrada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao registrar campanha:', error);
      alert('Erro ao registrar campanha.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-gray-200 w-1/4 p-6">
        <Link to="/dashboard" className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 block">
          Profissional
        </Link>
        <Link to="/listar" className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 block">
          Ver Lista de Profissionais
        </Link>
        <Link to="/agenda" className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 block">
          Registrar Campanha
        </Link>
        <Link to="/calendario" className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 block">
          Ver Calendário
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-6">Registrar Campanha</h2>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700">Título da Campanha:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Local:</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Data:</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nome do Profissional:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Especialização:</label>
            <input
              type="text"
              value={especializacao}
              onChange={(e) => setEspecializacao(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Horário:</label>
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              rows="4"
              required
            ></textarea>
          </div>
          <input type="submit" value="Registrar" className="w-full py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400" />
        </form>
      </div>
    </div>
  );
}

export default Agenda;
