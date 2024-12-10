import axios from 'axios';
import { useState } from 'react';

const CreateProfessional = () => {
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = 'admin';
    const password = 'senha123';
    const token = btoa(`${username}:${password}`);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/ubs/1/medicos',
        formData,
        {
          headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Profissional cadastrado com sucesso!');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao registrar profissional:', error.response?.data);
      alert('Erro ao registrar profissional.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Cadastrar Profissional</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-600"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Especialidade */}
          <div>
            <label
              htmlFor="especialidade"
              className="block text-sm font-medium text-gray-600"
            >
              Especialidade
            </label>
            <input
              type="text"
              id="especialidade"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Botão */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfessional;
