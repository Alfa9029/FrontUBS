import React, { useState } from 'react';
import axios from 'axios';

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    data_inicio: '',
    data_fim: '',
  });

  const [selectedUbsId, setSelectedUbsId] = useState(1);

  // Atualiza os dados no formulário conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.descricao || !formData.data_inicio || !formData.data_fim) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const campaignData = {
      nome: formData.nome,
      descricao: formData.descricao,
      ubs_id: selectedUbsId,
      data_inicio: formData.data_inicio,
      data_fim: formData.data_fim,
    };

    try {
      const response = await axios.post(
        `https://ubs-backend-pn16.onrender.com/api/ubs/${selectedUbsId}/campanhas`, // Correção da URL
        campaignData,
        {
          headers: {
            'Authorization': `Basic ${btoa('admin:senha123')}`, // Adicionando autenticação básica
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Campanha criada com sucesso!');
      console.log('Resposta da criação:', response.data);
    } catch (error) {
      console.error('Erro ao criar campanha:', error.response?.data || error.message);
      alert('Erro ao criar campanha. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Criar Nova Campanha</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome da Campanha:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="data_inicio">Data de Início:</label>
          <input
            type="date"
            id="data_inicio"
            name="data_inicio"
            value={formData.data_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="data_fim">Data de Fim:</label>
          <input
            type="date"
            id="data_fim"
            name="data_fim"
            value={formData.data_fim}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Campanha</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
