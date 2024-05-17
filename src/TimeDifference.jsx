import React, { useState, useEffect } from 'react';
import brazilFlag from './assets/brazil.png'; // Caminho para a bandeira do Brasil
import germanyFlag from './assets/germany.png'; // Caminho para a bandeira da Alemanha
import './App.css'

const TimeDifference = () => {
  const [timeDifference, setTimeDifference] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [conversionType, setConversionType] = useState('BRtoDE'); // 'BRtoDE' or 'DEtoBR'
  const [currentGermanyTime, setCurrentGermanyTime] = useState('');
  const [currentBrazilTime, setCurrentBrazilTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // Hora atual no Brasil (BRT - UTC-3)
      const brazilTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

      // Hora atual na Alemanha (CET/CEST - UTC+1/UTC+2)
      const germanyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));

      // Calcular a diferença de horas
      const diffInHours = (germanyTime - brazilTime) / 1000 / 60 / 60;

      setTimeDifference(diffInHours);
      setCurrentGermanyTime(germanyTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentBrazilTime(brazilTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateTimes();

    // Atualiza a cada segundo
    const intervalId = setInterval(updateTimes, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    setInputTime(inputTime);

    if (inputTime) {
      const date = new Date(`1970-01-01T${inputTime}:00`);

      if (conversionType === 'BRtoDE') {
        const brazilTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        const germanyTime = new Date(brazilTime.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
        setConvertedTime(germanyTime.toTimeString().slice(0, 8)); // Formato HH:MM:SS
      } else {
        const germanyTime = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
        const brazilTime = new Date(germanyTime.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        setConvertedTime(brazilTime.toTimeString().slice(0, 8)); // Formato HH:MM:SS
      }
    } else {
      setConvertedTime('');
    }
  };

  return (
    <div className="container">
      <h1>Diferença de Horário dai pra cá</h1>
      <p>A diferença de horário entre o Brasil e a Alemanha é de {timeDifference.toFixed(2)} horas, amor.</p>
      <div className="time-display">
        <img src={brazilFlag} alt="Bandeira do Brasil" className="flag" />
        <p>Hora atual no Brasil: {currentBrazilTime}</p>
      </div>
      <div className="time-display">
        <img src={germanyFlag} alt="Bandeira da Alemanha" className="flag" />
        <p>Hora atual na Alemanha: {currentGermanyTime}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setConversionType('BRtoDE')} style={{ marginRight: '10px' }}>
          Converter Brasil para Alemanha
        </button>
        <button onClick={() => setConversionType('DEtoBR')}>
          Converter Alemanha para Brasil
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>
          {conversionType === 'BRtoDE' ? 'Hora no Brasil (BRT):' : 'Hora na Alemanha (CET):'}
          <input
            type="time"
            value={inputTime}
            onChange={handleTimeChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>
          {conversionType === 'BRtoDE' ? 'Hora correspondente na Alemanha:' : 'Hora correspondente no Brasil:'}
          <input
            type="text"
            value={convertedTime}
            readOnly
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
    </div>
  );
};

export default TimeDifference;
