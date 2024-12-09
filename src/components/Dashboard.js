import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Estados para armazenar os valores do formulário
  const [nome, setNome] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [especializacao, setEspecializacao] = useState('');
  const [local, setLocal] = useState('');
  const [horario, setHorario] = useState('');
  const [data, setData] = useState('');

  // Função para salvar os dados no LocalStorage
  const handleSave = (e) => {
    e.preventDefault();

    const newProfissional = {
      nome,
      identificador,
      especializacao,
      local,
      horario,
      data,
    };

    // Recupera a lista existente ou cria uma nova, garantindo que seja sempre um array
    let existingData = JSON.parse(localStorage.getItem('formData'));

    if (!Array.isArray(existingData)) {
      existingData = []; // Se não for um array, inicializa como um array vazio
    }

    // Adiciona o novo profissional à lista
    existingData.push(newProfissional);

    // Salva a lista atualizada no Local Storage
    localStorage.setItem('formData', JSON.stringify(existingData));

    // Limpa os campos do formulário após o salvamento
    setNome('');
    setIdentificador('');
    setEspecializacao('');
    setLocal('');
    setHorario('');
    setData('');

    alert('Profissional registrado com sucesso!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-gray-200 w-1/4 p-6">
        <Link
          to="/dashboard"
          className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 focus:outline-none block"
        >
          Profissional
        </Link>
        <Link
          to="/listar"
          className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 focus:outline-none block"
        >
          Ver Lista de Profissionais
        </Link>
        <Link
          to="/agenda"
          className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 focus:outline-none block"
        >
          Registrar Campanha
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-6">Registrar Profissional</h2>

        {/* Formulário */}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Digite o nome"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Identificador:</label>
            <input
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Digite o identificador"
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
              placeholder="Digite a especialização"
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
              placeholder="Digite o local"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Horário de Atendimento:</label>
            <input
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Digite o horário de atendimento"
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
            <input
              type="submit"
              value="Registrar"
              className="w-full py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
