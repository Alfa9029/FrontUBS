import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendario() {
  const [campanhas, setCampanhas] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [campanhasDoDia, setCampanhasDoDia] = useState([]);

  useEffect(() => {
    const savedCampanhas = JSON.parse(localStorage.getItem("campanhaData"));
    if (Array.isArray(savedCampanhas)) {
      setCampanhas(savedCampanhas);
    }
  }, []);

  useEffect(() => {
    const campanhasNaData = campanhas.filter(
      (campanha) => campanha.data === format(dataSelecionada, "yyyy-MM-dd")
    );
    setCampanhasDoDia(campanhasNaData);
  }, [dataSelecionada, campanhas]);

  // Função para verificar se existe alguma campanha para uma data
  const temCampanhaNaData = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return campanhas.some((campanha) => campanha.data === dateString);
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
          className="w-full py-3 text-center text-xl font-semibold bg-white rounded-md hover:bg-gray-300"
        >
          Registrar Campanha
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
              <h4 className="font-semibold">{campanha.titulo}</h4>
              <p><strong>Local:</strong> {campanha.local}</p>
              <p><strong>Nome:</strong> {campanha.nome}</p>
              <p><strong>Especialização:</strong> {campanha.especializacao}</p>
              <p><strong>Horário:</strong> {campanha.horario}</p>
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
