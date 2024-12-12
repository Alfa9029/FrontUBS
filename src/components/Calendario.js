import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, isWithinInterval, parseISO } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';

function Calendario() {
  const [campanhas, setCampanhas] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [campanhasDoDia, setCampanhasDoDia] = useState([]);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const response = await axios.get('https://ubs-backend-pn16.onrender.com/api/ubs/campanhas');
        setCampanhas(response.data);
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      }
    };

    fetchCampanhas();
  }, []);

  useEffect(() => {
    const campanhasNaData = campanhas.filter((campanha) => {
      const dataInicio = parseISO(campanha.data_inicio);
      const dataFim = parseISO(campanha.data_fim);
      return isWithinInterval(dataSelecionada, { start: dataInicio, end: dataFim });
    });
    setCampanhasDoDia(campanhasNaData);
  }, [dataSelecionada, campanhas]);

  // Função para verificar se existe alguma campanha para uma data
  const temCampanhaNaData = (date) => {
    return campanhas.some((campanha) => {
      const dataInicio = parseISO(campanha.data_inicio);
      const dataFim = parseISO(campanha.data_fim);
      return isWithinInterval(date, { start: dataInicio, end: dataFim });
    });
  };

  // Função para adicionar uma classe personalizada nas datas com campanhas
  const tileClassName = ({ date, view }) => {
    // Verifica se a data tem campanha e se estamos na visualização de mês
    if (view === "month" && temCampanhaNaData(date)) {
      return "bg-yellow-400 text-white rounded-full"; // Classe do Tailwind para destacar
    }
    return null;
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-gray-200 w-1/4 p-6">
        <Link
          to="/agenda"
          className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 block"
        >
          Registrar Campanha
        </Link>
        <Link
          to="/calendario"
          className="w-full py-3 mb-4 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300 block"
        >
          Ver Calendário
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-6">Calendário de Campanhas</h2>

        {/* Calendário */}
        <Calendar
          onChange={setDataSelecionada}
          value={dataSelecionada}
          tileClassName={tileClassName} // Aplica o destaque nas datas
        />

        <h3 className="text-xl font-semibold mt-6">
          Campanhas do dia: {format(dataSelecionada, "dd/MM/yyyy")}
        </h3>

        {campanhasDoDia.length > 0 ? (
          campanhasDoDia.map((campanha, index) => (
            <div key={index} className="p-4 border bg-gray-100 rounded-md mb-4">
              <h4 className="font-semibold">{campanha.nome}</h4>
              <p><strong>Descrição:</strong> {campanha.descricao}</p>
              <p><strong>Data de Início:</strong> {format(parseISO(campanha.data_inicio), "dd/MM/yyyy")}</p>
              <p><strong>Data de Fim:</strong> {format(parseISO(campanha.data_fim), "dd/MM/yyyy")}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma campanha registrada para essa data.</p>
        )}
      </div>
    </div>
  );
}

export default Calendario;
